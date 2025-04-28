<?php
// Desactivar la visualización de errores de PHP
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'Controller/ParticipanteController.php';

// Verificar si es una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
    exit;
}

try {
    // Verificar token
    $headers = getallheaders();
    $token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

    if (!$token) {
        throw new Exception('No autorizado');
    }

    // Verificar si se subió un archivo
    if (!isset($_FILES['project'])) {
        throw new Exception('No se ha subido ningún archivo');
    }

    $file = $_FILES['project'];
    $userId = $_POST['userId'] ?? null;

    if (!$userId) {
        throw new Exception('ID de usuario no proporcionado');
    }

    // Verificar si el usuario ya tiene un proyecto
    $controller = new ParticipanteController();
    if ($controller->hasProject($userId)) {
        throw new Exception('Ya has subido un proyecto. Solo se permite un proyecto por usuario.');
    }

    // Validaciones de archivo
    $maxFileSize = 50 * 1024 * 1024; // 50MB
    $allowedTypes = [
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed',
        'application/pdf'
    ];

    // Verificar tamaño
    if ($file['size'] > $maxFileSize) {
        throw new Exception('El archivo excede el tamaño máximo permitido de 50MB');
    }

    // Verificar tipo MIME
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mimeType, $allowedTypes)) {
        throw new Exception('Tipo de archivo no permitido. Solo se permiten archivos ZIP, RAR y PDF');
    }

    // Verificar error de subida
    if ($file['error'] !== UPLOAD_ERR_OK) {
        $errorMessage = match($file['error']) {
            UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamaño máximo permitido',
            UPLOAD_ERR_PARTIAL => 'El archivo solo se subió parcialmente',
            UPLOAD_ERR_NO_FILE => 'No se subió ningún archivo',
            UPLOAD_ERR_NO_TMP_DIR => 'Error del servidor: directorio temporal no encontrado',
            UPLOAD_ERR_CANT_WRITE => 'Error del servidor: no se pudo escribir el archivo',
            UPLOAD_ERR_EXTENSION => 'Error del servidor: una extensión de PHP detuvo la subida del archivo',
            default => 'Error desconocido al subir el archivo'
        };
        throw new Exception($errorMessage);
    }

    // Crear directorio para proyectos si no existe
    $uploadDir = 'uploads/projects/';
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0777, true)) {
            throw new Exception('Error al crear el directorio de subida');
        }
    }

    // Generar nombre único para el archivo
    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = $userId . '_' . time() . '_' . bin2hex(random_bytes(8)) . '.' . $fileExtension;
    $targetPath = $uploadDir . $fileName;

    // Verificar que el archivo temporal es válido
    if (!is_uploaded_file($file['tmp_name'])) {
        throw new Exception('Error de seguridad: archivo no subido correctamente');
    }

    // Calcular hash del archivo original
    $originalHash = hash_file('sha256', $file['tmp_name']);

    // Mover el archivo de manera segura
    if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
        throw new Exception('Error al mover el archivo subido');
    }

    // Verificar que el archivo se movió correctamente y es accesible
    if (!file_exists($targetPath) || !is_readable($targetPath)) {
        throw new Exception('Error al verificar el archivo subido');
    }

    // Verificar el hash del archivo movido
    $movedHash = hash_file('sha256', $targetPath);
    if ($originalHash !== $movedHash) {
        unlink($targetPath); // Eliminar el archivo corrupto
        throw new Exception('Error de integridad del archivo: el archivo se corrompió durante la transferencia');
    }

    // Verificar el tamaño del archivo movido
    if (filesize($targetPath) !== $file['size']) {
        unlink($targetPath);
        throw new Exception('Error de integridad del archivo: el tamaño del archivo no coincide');
    }

    // Registrar la subida en la base de datos
    $result = $controller->registrarProyecto([
        'userId' => $userId,
        'fileName' => $fileName,
        'originalName' => $file['name'],
        'filePath' => $targetPath
    ]);

    if (!$result['success']) {
        // Si falla el registro en la base de datos, eliminar el archivo subido
        unlink($targetPath);
        throw new Exception($result['message']);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Proyecto subido exitosamente'
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} 