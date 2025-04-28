<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5174');
header('Access-Control-Allow-Methods: PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtener el cuerpo de la solicitud
$requestBody = file_get_contents('php://input');
$data = json_decode($requestBody, true);

// Verificar que se proporcionaron los datos necesarios
if (!isset($data['projectId']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit();
}

$projectId = $data['projectId'];
$status = $data['status'];

require_once '../config/Database.php';
require_once '../Controller/AdminController.php';

try {
    $adminController = new AdminController();
    $result = $adminController->updateProjectStatus($projectId, $status);
    
    if (!$result['success']) {
        http_response_code(400);
        echo json_encode(['error' => $result['message']]);
        exit();
    }
    
    echo json_encode([
        'success' => true,
        'message' => $result['message']
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 