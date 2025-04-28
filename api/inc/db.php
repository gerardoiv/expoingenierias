<?php
require_once 'config.php';

class Database {
    private $connection = null;
    private static $instance = null;

    private function __construct() {
        try {
            $this->connection = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE_NAME);
            
            if ($this->connection->connect_error) {
                throw new Exception("Error de conexión: " . $this->connection->connect_error);
            }
            
            $this->connection->set_charset("utf8");
        } catch (Exception $e) {
            die("Error: " . $e->getMessage());
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getConnection() {
        return $this->connection;
    }

    public function query($sql) {
        try {
            $result = $this->connection->query($sql);
            if ($result === false) {
                throw new Exception("Error en la consulta: " . $this->connection->error);
            }
            return $result;
        } catch (Exception $e) {
            die("Error: " . $e->getMessage());
        }
    }

    public function escape($value) {
        return $this->connection->real_escape_string($value);
    }

    public function __destruct() {
        if ($this->connection) {
            $this->connection->close();
        }
    }
} 