<?php

require_once __DIR__ . '/../inc/db.php';

class AdminController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function login($username, $password) {
        try {
            // Verificar que se proporcionaron las credenciales
            if (empty($username) || empty($password)) {
                return [
                    'success' => false,
                    'message' => 'Usuario y contraseña son requeridos'
                ];
            }
            
            // Buscar el administrador por nombre de usuario
            $stmt = $this->db->getConnection()->prepare("SELECT * FROM administradores WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                return [
                    'success' => false,
                    'message' => 'Credenciales inválidas'
                ];
            }
            
            $admin = $result->fetch_assoc();
            
            // Verificar la contraseña
            if (!password_verify($password, $admin['password'])) {
                return [
                    'success' => false,
                    'message' => 'Credenciales inválidas'
                ];
            }
            
            // Generar token
            $token = bin2hex(random_bytes(32));
            
            // Eliminar la contraseña antes de devolver los datos
            unset($admin['password']);
            
            return [
                'success' => true,
                'message' => 'Login exitoso',
                'token' => $token,
                'admin' => $admin
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error en el servidor: ' . $e->getMessage()
            ];
        }
    }
    
    public function createAdmin($username, $password, $nombre, $email) {
        try {
            // Verificar que todos los campos requeridos estén presentes
            if (empty($username) || empty($password) || empty($nombre) || empty($email)) {
                return [
                    'success' => false,
                    'message' => 'Todos los campos son requeridos'
                ];
            }
            
            // Verificar si el nombre de usuario ya existe
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM administradores WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                return [
                    'success' => false,
                    'message' => 'El nombre de usuario ya está en uso'
                ];
            }
            
            // Verificar si el email ya existe
            $stmt = $this->db->getConnection()->prepare("SELECT id FROM administradores WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                return [
                    'success' => false,
                    'message' => 'El email ya está en uso'
                ];
            }
            
            // Hash de la contraseña
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            
            // Insertar el nuevo administrador
            $stmt = $this->db->getConnection()->prepare("INSERT INTO administradores (username, password, nombre, email) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $username, $hashedPassword, $nombre, $email);
            
            if ($stmt->execute()) {
                return [
                    'success' => true,
                    'message' => 'Administrador creado exitosamente'
                ];
            } else {
                return [
                    'success' => false,
                    'message' => 'Error al crear el administrador: ' . $stmt->error
                ];
            }
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error en el servidor: ' . $e->getMessage()
            ];
        }
    }
    
    public function getProjects() {
        try {
            // Verificar token de administrador (esto se haría en el endpoint)
            
            // Obtener todos los proyectos con información del participante
            $query = "SELECT p.*, pa.nombre, pa.matricula, pa.carrera, pa.semestre, 
                            p.nombre_archivo, p.nombre_original, p.ruta_archivo, p.estado, p.fecha_subida
                     FROM proyectos p 
                     JOIN participantes pa ON p.participante_id = pa.matricula 
                     ORDER BY p.fecha_subida DESC";
            
            $stmt = $this->db->getConnection()->prepare($query);
            $stmt->execute();
            
            $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            return $projects;
            
        } catch (Exception $e) {
            throw new Exception('Error al obtener los proyectos: ' . $e->getMessage());
        }
    }
    
    public function updateProjectStatus($projectId, $status) {
        try {
            // Verificar token de administrador (esto se haría en el endpoint)
            
            // Validar el estado
            $validStatuses = ['pendiente', 'en_revision', 'aprobado', 'rechazado'];
            if (!in_array($status, $validStatuses)) {
                throw new Exception('Estado no válido');
            }
            
            // Actualizar el estado del proyecto
            $query = "UPDATE proyectos SET estado = ? WHERE id = ?";
            $stmt = $this->db->getConnection()->prepare($query);
            $result = $stmt->execute([$status, $projectId]);
            
            if (!$result) {
                throw new Exception('Error al actualizar el estado del proyecto');
            }
            
            return true;
            
        } catch (Exception $e) {
            throw new Exception('Error al actualizar el estado: ' . $e->getMessage());
        }
    }
    
    public function getProjectFile($projectId) {
        try {
            // Verificar token de administrador (esto se haría en el endpoint)
            
            // Obtener la información del archivo
            $stmt = $this->db->getConnection()->prepare("SELECT ruta_archivo, nombre_archivo FROM proyectos WHERE id = ?");
            $stmt->bind_param("i", $projectId);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                return [
                    'success' => false,
                    'message' => 'Proyecto no encontrado'
                ];
            }
            
            $project = $result->fetch_assoc();
            $filePath = $project['ruta_archivo'];
            
            // Verificar que el archivo existe
            if (!file_exists($filePath)) {
                return [
                    'success' => false,
                    'message' => 'Archivo no encontrado'
                ];
            }
            
            return [
                'success' => true,
                'filePath' => $filePath,
                'fileName' => $project['nombre_archivo']
            ];
            
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error en el servidor: ' . $e->getMessage()
            ];
        }
    }

    public function getUsers() {
        try {
            // Consulta para obtener todos los usuarios
            $query = "SELECT p.*, 
                             GROUP_CONCAT(pr.id) as project_ids,
                             GROUP_CONCAT(pr.nombre_archivo) as project_names,
                             GROUP_CONCAT(pr.nombre_original) as project_original_names,
                             GROUP_CONCAT(pr.ruta_archivo) as project_file_paths,
                             GROUP_CONCAT(pr.estado) as project_states,
                             GROUP_CONCAT(pr.fecha_subida) as project_dates
                      FROM participantes p
                      LEFT JOIN proyectos pr ON p.matricula = pr.participante_id
                      GROUP BY p.id, p.nombre, p.matricula, p.email, p.semestre, p.carrera, p.created_at";
            
            $result = $this->db->query($query);
            
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            
            // Process the results to format project data
            foreach ($users as &$user) {
                $user['proyectos'] = [];
                if ($user['project_ids']) {
                    $projectIds = explode(',', $user['project_ids']);
                    $projectNames = explode(',', $user['project_names']);
                    $projectOriginalNames = explode(',', $user['project_original_names']);
                    $projectFilePaths = explode(',', $user['project_file_paths']);
                    $projectStates = explode(',', $user['project_states']);
                    $projectDates = explode(',', $user['project_dates']);
                    
                    for ($i = 0; $i < count($projectIds); $i++) {
                        $user['proyectos'][] = [
                            'id' => $projectIds[$i],
                            'nombre_equipo' => $projectNames[$i],
                            'nombre_archivo' => $projectNames[$i],
                            'nombre_original' => $projectOriginalNames[$i],
                            'ruta_archivo' => $projectFilePaths[$i],
                            'estado' => $projectStates[$i],
                            'fecha_subida' => $projectDates[$i]
                        ];
                    }
                }
                
                // Remove the concatenated fields
                unset($user['project_ids']);
                unset($user['project_names']);
                unset($user['project_original_names']);
                unset($user['project_file_paths']);
                unset($user['project_states']);
                unset($user['project_dates']);
            }
            
            return $users;
        } catch (Exception $e) {
            throw new Exception("Error al obtener usuarios: " . $e->getMessage());
        }
    }
} 