<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

require_once __DIR__ . '/../../config/Database.php';
require_once __DIR__ . '/../Controller/AdminController.php';

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!isset($data['projectId']) || !isset($data['status'])) {
        throw new Exception('Faltan datos requeridos');
    }
    
    $adminController = new AdminController(new Database());
    $result = $adminController->updateProjectStatus($data['projectId'], $data['status']);
    
    echo json_encode([
        'success' => true,
        'message' => 'Estado actualizado correctamente'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
} 