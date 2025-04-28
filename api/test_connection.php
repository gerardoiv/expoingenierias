<?php
require_once 'inc/db.php';

try {
    $db = Database::getInstance();
    echo "Conexión exitosa a la base de datos!\n";
    
    // Test query
    $result = $db->query("SELECT 1");
    if ($result) {
        echo "Consulta de prueba exitosa!\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
} 