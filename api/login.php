<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'Controller/ParticipanteController.php';

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

// Crear instancia del controlador
$controller = new ParticipanteController();

// Intentar login
$result = $controller->login($data);

// Devolver la respuesta
echo json_encode($result); 