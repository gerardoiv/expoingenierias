<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5174');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Verificar que se proporcionó el ID del proyecto
if (!isset($_GET['id'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID de proyecto no proporcionado']);
    exit();
}

$projectId = $_GET['id'];

require_once '../config/Database.php';
require_once '../Controller/AdminController.php';

try {
    $adminController = new AdminController();
    $fileInfo = $adminController->getProjectFile($projectId);
    
    if (!$fileInfo['success']) {
        http_response_code(404);
        echo json_encode(['error' => $fileInfo['message']]);
        exit();
    }
    
    $filePath = $fileInfo['filePath'];
    
    // Verificar que el archivo existe y es accesible
    if (!file_exists($filePath) || !is_readable($filePath)) {
        http_response_code(404);
        echo json_encode(['error' => 'Archivo no encontrado o no accesible']);
        exit();
    }
    
    // Verificar el tipo MIME del archivo
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $filePath);
    finfo_close($finfo);
    
    // Configurar headers para la descarga del archivo
    header('Content-Type: ' . $mimeType);
    header('Content-Disposition: attachment; filename="' . $fileInfo['fileName'] . '"');
    header('Content-Length: ' . filesize($filePath));
    header('Cache-Control: no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
    
    // Abrir el archivo en modo binario
    $handle = fopen($filePath, 'rb');
    if ($handle === false) {
        throw new Exception('No se pudo abrir el archivo');
    }
    
    // Enviar el archivo en chunks para manejar archivos grandes
    while (!feof($handle)) {
        $buffer = fread($handle, 8192);
        if ($buffer === false) {
            throw new Exception('Error al leer el archivo');
        }
        echo $buffer;
        flush();
    }
    
    fclose($handle);
    exit();
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 