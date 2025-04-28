-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS expo_ingenierias;
USE expo_ingenierias;

-- Tabla de participantes
CREATE TABLE IF NOT EXISTS participantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    matricula VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    semestre INT NOT NULL,
    carrera VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de administradores
CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    participante_id VARCHAR(20) NOT NULL,
    nombre_archivo VARCHAR(255) NOT NULL,
    nombre_original VARCHAR(255) NOT NULL,
    ruta_archivo VARCHAR(255) NOT NULL,
    estado ENUM('pendiente', 'aprobado', 'rechazado', 'en_revision') DEFAULT 'pendiente',
    fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (participante_id) REFERENCES participantes(matricula) ON DELETE CASCADE
);

-- Índices para optimizar búsquedas
CREATE INDEX idx_participante_matricula ON participantes(matricula);
CREATE INDEX idx_participante_email ON participantes(email);
CREATE INDEX idx_admin_username ON administradores(username);
CREATE INDEX idx_admin_email ON administradores(email);
CREATE INDEX idx_proyecto_estado ON proyectos(estado);
CREATE INDEX idx_proyecto_fecha ON proyectos(fecha_subida);

-- Crear un administrador por defecto
-- Contraseña: admin123 (hasheada con bcrypt)
INSERT INTO administradores (username, password, nombre, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Administrador Principal', 'admin@expo.com');

-- Comentarios sobre la estructura:
-- 1. La tabla participantes almacena la información de los estudiantes
-- 2. La tabla administradores gestiona las cuentas de administración
-- 3. La tabla proyectos relaciona los archivos subidos con los participantes
-- 4. Se utilizan índices para optimizar las búsquedas comunes
-- 5. Se incluye un administrador por defecto para inicio del sistema
-- 6. Todas las tablas incluyen timestamps para auditoría
-- 7. Se utilizan restricciones FOREIGN KEY para mantener la integridad referencial
-- 8. Se implementan campos UNIQUE para evitar duplicados en datos críticos 