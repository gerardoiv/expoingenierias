<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Activar reporte de errores
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once __DIR__ . '/../Controller/AdminController.php';

// Verificar si es una petición POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido'
    ]);
    exit;
}

// Obtener los datos del cuerpo de la petición
$data = json_decode(file_get_contents('php://input'), true);

// Si no hay datos, intentar obtenerlos de $_POST
if (empty($data)) {
    $data = $_POST;
}

// Verificar que se proporcionaron los datos necesarios
if (!isset($data['username']) || !isset($data['password']) || !isset($data['nombre']) || !isset($data['email'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Todos los campos son requeridos',
        'received_data' => $data
    ]);
    exit;
}

// Crear instancia del controlador
$controller = new AdminController();

// Crear administrador
$result = $controller->createAdmin(
    $data['username'],
    $data['password'],
    $data['nombre'],
    $data['email']
);

// Devolver la respuesta
echo json_encode($result); 