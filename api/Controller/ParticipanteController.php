<?php
require_once __DIR__ . '/../inc/db.php';

class ParticipanteController {
    private $db;

    public function __construct() {
        $this->db = Database::getInstance();
    }

    public function registrar($data) {
        try {
            // Validar datos requeridos
            if (empty($data['nombre']) || empty($data['matricula']) || 
                empty($data['email']) || empty($data['password']) || 
                empty($data['semestre']) || empty($data['carrera'])) {
                return [
                    'success' => false,
                    'message' => 'Todos los campos son requeridos'
                ];
            }

            // Validar formato de email
            if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
                return [
                    'success' => false,
                    'message' => 'El formato del email no es válido'
                ];
            }

            // Verificar si el email ya existe
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM participantes WHERE email = ?");
            $stmt->bind_param("s", $data['email']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                return [
                    'success' => false,
                    'message' => 'El email ya está registrado'
                ];
            }

            // Verificar si la matrícula ya existe
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM participantes WHERE matricula = ?");
            $stmt->bind_param("s", $data['matricula']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                return [
                    'success' => false,
                    'message' => 'La matrícula ya está registrada'
                ];
            }

            // Hash de la contraseña
            $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);

            // Preparar la consulta SQL
            $stmt = $this->db->getConnection()->prepare(
                "INSERT INTO participantes (nombre, matricula, email, password, semestre, carrera) 
                 VALUES (?, ?, ?, ?, ?, ?)"
            );

            // Vincular parámetros
            $stmt->bind_param(
                "ssssis",
                $data['nombre'],
                $data['matricula'],
                $data['email'],
                $hashedPassword,
                $data['semestre'],
                $data['carrera']
            );

            // Ejecutar la consulta
            if ($stmt->execute()) {
                return [
                    'success' => true,
                    'message' => 'Participante registrado exitosamente'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Error al registrar el participante'
                ];
            }

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }

    public function login($data) {
        try {
            // Validar datos requeridos
            if (empty($data['email']) || empty($data['password'])) {
                return [
                    'success' => false,
                    'message' => 'Email y contraseña son requeridos'
                ];
            }

            // Buscar usuario por email
            $stmt = $this->db->getConnection()->prepare(
                "SELECT id, nombre, matricula, email, password, semestre, carrera 
                 FROM participantes 
                 WHERE email = ?"
            );
            $stmt->bind_param("s", $data['email']);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows === 0) {
                return [
                    'success' => false,
                    'message' => 'Credenciales incorrectas'
                ];
            }

            $user = $result->fetch_assoc();

            // Verificar contraseña
            if (!password_verify($data['password'], $user['password'])) {
                return [
                    'success' => false,
                    'message' => 'Credenciales incorrectas'
                ];
            }

            // Generar token (en una implementación real, usar JWT)
            $token = bin2hex(random_bytes(32));

            // Eliminar la contraseña antes de enviar los datos
            unset($user['password']);

            return [
                'success' => true,
                'message' => 'Login exitoso',
                'token' => $token,
                'user' => $user
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }

    public function hasProject($userId) {
        try {
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM proyectos WHERE participante_id = ?");
            $stmt->bind_param("s", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            return $result->num_rows > 0;
        } catch (Exception $e) {
            throw new Exception("Error al verificar proyectos del usuario: " . $e->getMessage());
        }
    }

    public function registrarProyecto($data) {
        try {
            // Validar datos requeridos
            if (empty($data['userId']) || empty($data['fileName']) || 
                empty($data['originalName']) || empty($data['filePath'])) {
                return [
                    'success' => false,
                    'message' => 'Datos incompletos'
                ];
            }

            // Verificar si el usuario existe
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM participantes WHERE matricula = ?");
            $stmt->bind_param("s", $data['userId']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                return [
                    'success' => false,
                    'message' => 'Usuario no encontrado'
                ];
            }

            // Verificar si el usuario ya tiene un proyecto
            if ($this->hasProject($data['userId'])) {
                return [
                    'success' => false,
                    'message' => 'Ya has subido un proyecto. Solo se permite un proyecto por usuario.'
                ];
            }

            // Preparar la consulta SQL
            $stmt = $this->db->getConnection()->prepare(
                "INSERT INTO proyectos (participante_id, nombre_archivo, nombre_original, ruta_archivo, estado) 
                 VALUES (?, ?, ?, ?, 'pendiente')"
            );

            // Vincular parámetros
            $stmt->bind_param(
                "ssss",
                $data['userId'],
                $data['fileName'],
                $data['originalName'],
                $data['filePath']
            );

            // Ejecutar la consulta
            if ($stmt->execute()) {
                return [
                    'success' => true,
                    'message' => 'Proyecto registrado exitosamente'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Error al registrar el proyecto'
                ];
            }

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error: ' . $e->getMessage()
            ];
        }
    }

    public function getUserProjects($userId) {
        try {
            // Consulta para obtener los proyectos del usuario
            $query = "SELECT id, nombre_archivo, nombre_original, ruta_archivo, estado, fecha_subida 
                     FROM proyectos 
                     WHERE participante_id = ? 
                     ORDER BY fecha_subida DESC";
            
            $stmt = $this->db->getConnection()->prepare($query);
            $stmt->bind_param("s", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            $projects = [];
            while ($row = $result->fetch_assoc()) {
                // Asegurarse de que todos los campos necesarios estén presentes
                $project = [
                    'id' => $row['id'],
                    'nombre_archivo' => $row['nombre_archivo'],
                    'nombre_original' => $row['nombre_original'],
                    'ruta_archivo' => $row['ruta_archivo'],
                    'estado' => $row['estado'],
                    'fecha_subida' => $row['fecha_subida']
                ];
                $projects[] = $project;
            }
            
            // Registrar para depuración
            error_log("Proyectos encontrados para usuario $userId: " . count($projects));
            
            return $projects;
            
        } catch (Exception $e) {
            error_log("Error en getUserProjects: " . $e->getMessage());
            throw new Exception("Error al obtener los proyectos del usuario: " . $e->getMessage());
        }
    }
} 