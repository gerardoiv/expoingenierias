<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

require_once __DIR__ . '/../Controller/AdminController.php';

$adminController = new AdminController();

// Obtener todos los administradores
$query = "SELECT id, username, nombre, email, created_at FROM administradores";
$result = $adminController->conn->query($query);

if ($result) {
    $admins = [];
    while ($row = $result->fetch_assoc()) {
        $admins[] = $row;
    }
    echo json_encode([
        'success' => true,
        'admins' => $admins
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al obtener administradores: ' . $adminController->conn->error
    ]);
} 