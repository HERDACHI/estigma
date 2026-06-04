-- Adaptado para MySQL 8.0
-- Compatible con InnoDB, FK estrictas y charset moderno

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS centrom7_estigma CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE centrom7_estigma;

-- ============================
-- Tabla: doctores
-- ============================

DROP TABLE IF EXISTS doctores;
CREATE TABLE doctores (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  especialidad VARCHAR(100),
  codigo VARCHAR(50),
  correo VARCHAR(100),
  telefono VARCHAR(50),
  foto VARCHAR(255),
  francoins INT UNSIGNED DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO doctores (id,nombre,especialidad,codigo,correo,telefono,foto,francoins) VALUES
 (1,'Dr. José Pérez','Cardiología','DOC001','perez@cmsf.com','0414-1234567','/assets/medicos/perez.png',90),
 (2,'Dra. Gómez','Pediatría','DOC002','gomez@cmsf.com','0414-9876543','/assets/medicos/gomez.png',80),
 (3,'Dr. Mario López','Traumatología','DOC003','lopez@cmsf.com','0414-5556677','/assets/medicos/mlopez.jpg',0);

-- ============================
-- Tabla: productos
-- ============================

DROP TABLE IF EXISTS productos;
CREATE TABLE productos (
  id INT NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(150) NOT NULL,
  costo INT NOT NULL,
  imagen VARCHAR(255),
  activo TINYINT(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO productos (id,nombre,costo,imagen,activo) VALUES
 (1,'Tensiómetro Omron5000',350,'/assets/productos/tensiometro.png',1),
 (2,'Glucómetro VidaCheck',250,'/assets/productos/glucometro.png',1),
 (3,'Oxímetro Digital',150,'/assets/productos/oximetro.webp',1),
 (4,'Inyectadora Diamond',30,'/assets/productos/inyectadora.webp',1);

-- ============================
-- Tabla: auditoria
-- ============================

DROP TABLE IF EXISTS auditoria;
CREATE TABLE auditoria (
  id INT NOT NULL AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  francoins INT NOT NULL,
  hospitalizaciones INT DEFAULT 0,
  consultas INT DEFAULT 0,
  cirugias INT DEFAULT 0,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_auditoria_doctor FOREIGN KEY (doctor_id) REFERENCES doctores(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO auditoria (id,doctor_id,francoins,hospitalizaciones,consultas,cirugias,fecha) VALUES
 (1,1,23,5,33,1,'2020-01-01 00:00:00');

-- ============================
-- Tabla: canjes
-- ============================

DROP TABLE IF EXISTS canjes;
CREATE TABLE canjes (
  id INT NOT NULL AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  producto_id INT NOT NULL,
  costo INT NOT NULL,
  francoins_antes INT NOT NULL,
  francoins_despues INT NOT NULL,
  fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_canjes_doctor FOREIGN KEY (doctor_id) REFERENCES doctores(id),
  CONSTRAINT fk_canjes_producto FOREIGN KEY (producto_id) REFERENCES productos(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO canjes (id,doctor_id,producto_id,costo,francoins_antes,francoins_despues,fecha) VALUES
 (1,1,3,150,180,30,'2026-04-12 10:47:30'),
 (2,3,3,150,150,0,'2026-04-12 10:59:33'),
 (3,1,4,30,30,0,'2026-04-12 16:22:55'),
 (4,1,3,150,300,150,'2026-04-12 16:24:58'),
 (5,1,4,30,150,120,'2026-04-12 16:25:14'),
 (6,1,4,30,120,90,'2026-04-12 16:26:29');

-- ============================
-- Tabla: servicios
-- ============================

DROP TABLE IF EXISTS servicios;
CREATE TABLE servicios (
  id INT NOT NULL AUTO_INCREMENT,
  doctor_id INT NOT NULL,
  hospitalizaciones INT DEFAULT 0,
  consultas INT DEFAULT 0,
  cirugias INT DEFAULT 0,
  mes VARCHAR(50),
  fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_servicios_doctor FOREIGN KEY (doctor_id) REFERENCES doctores(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO servicios (id,doctor_id,hospitalizaciones,consultas,cirugias,mes,fecha_registro) VALUES
 (1,1,5,20,2,'Septiembre 2023','2026-03-22 22:45:45'),
 (2,2,3,15,1,'Septiembre 2023','2026-03-22 22:45:45'),
 (3,3,7,25,4,'Septiembre 2023','2026-03-22 22:45:45');

-- ============================
-- Tabla: usuarios
-- ============================

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  tipo ENUM('administrador','doctor','auditor') NOT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  doctor_id INT DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY usuario (usuario),
  CONSTRAINT fk_usuario_doctor FOREIGN KEY (doctor_id) REFERENCES doctores(id) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios (id,usuario,password,tipo,creado_en,doctor_id) VALUES
 (1,'admin','admin','administrador','2026-03-22 22:45:45',NULL),
 (2,'jperez','123','doctor','2026-03-22 22:45:45',1),
 (3,'auditor','123','auditor','2026-03-22 22:45:45',NULL),
 (4,'Gladys Ripley','12345678','administrador','2026-03-29 17:35:24',NULL),
 (5,'mlopez','54321','doctor','2026-03-29 17:35:24',3);

SET FOREIGN_KEY_CHECKS = 1;

