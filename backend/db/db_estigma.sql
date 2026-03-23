-- Crear base de datos
CREATE DATABASE IF NOT EXISTS db_estigma;
USE db_estigma;

-- Tabla de usuarios del sistema (login)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('administrador', 'doctor', 'auditor') NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de doctores
CREATE TABLE doctores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    codigo VARCHAR(50),
    correo VARCHAR(100),
    telefono VARCHAR(50),
    foto VARCHAR(255),
    francoins INT DEFAULT 0
);

-- Tabla de servicios realizados por doctor
CREATE TABLE servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    hospitalizaciones INT DEFAULT 0,
    consultas INT DEFAULT 0,
    cirugias INT DEFAULT 0,
    mes VARCHAR(50),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctores(id)
);

-- Tabla de productos del catálogo
CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    costo INT NOT NULL,
    imagen VARCHAR(255)
);

-- Tabla de auditoría de movimientos de francoins
CREATE TABLE auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    francoins INT NOT NULL,
    hospitalizaciones INT DEFAULT 0,
    consultas INT DEFAULT 0,
    cirugias INT DEFAULT 0,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (doctor_id) REFERENCES doctores(id)
);

-- Insertar usuarios iniciales
INSERT INTO usuarios (usuario, password, tipo) VALUES
('admin', 'admin', 'administrador'),
('doctor', '123', 'doctor'),
('auditor', '123', 'auditor');

-- Insertar doctores de ejemplo
INSERT INTO doctores (nombre, especialidad, codigo, correo, telefono, foto, francoins) VALUES
('Dr. Pérez', 'Cardiología', 'DOC001', 'perez@cmsf.com', '0414-1234567', '/assets/medicos/perez.png', 120),
('Dra. Gómez', 'Pediatría', 'DOC002', 'gomez@cmsf.com', '0414-9876543', '/assets/medicos/gomez.png', 80),
('Dr. López', 'Traumatología', 'DOC003', 'lopez@cmsf.com', '0414-5556677', '/assets/medicos/lopez.png', 150);

-- Insertar servicios de ejemplo
INSERT INTO servicios (doctor_id, hospitalizaciones, consultas, cirugias, mes) VALUES
(1, 5, 20, 2, 'Septiembre 2023'),
(2, 3, 15, 1, 'Septiembre 2023'),
(3, 7, 25, 4, 'Septiembre 2023');

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, costo, imagen) VALUES
('Tensiómetro Omron', 300, '/assets/productos/tensiometro.png'),
('Glucómetro VidaCheck', 250, '/assets/productos/glucometro.png'),
('Oxímetro Digital', 150, '/assets/productos/oximetro.png');
