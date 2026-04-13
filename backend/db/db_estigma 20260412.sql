-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.52


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema db_estigma
--

CREATE DATABASE IF NOT EXISTS db_estigma;
USE db_estigma;

--
-- Definition of table `auditoria`
--

DROP TABLE IF EXISTS `auditoria`;
CREATE TABLE `auditoria` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `francoins` int(11) NOT NULL,
  `hospitalizaciones` int(11) DEFAULT '0',
  `consultas` int(11) DEFAULT '0',
  `cirugias` int(11) DEFAULT '0',
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `auditoria_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `auditoria`
--

/*!40000 ALTER TABLE `auditoria` DISABLE KEYS */;
INSERT INTO `auditoria` (`id`,`doctor_id`,`francoins`,`hospitalizaciones`,`consultas`,`cirugias`,`fecha`) VALUES 
 (1,1,23,5,33,1,'2020-01-01 00:00:00');
/*!40000 ALTER TABLE `auditoria` ENABLE KEYS */;


--
-- Definition of table `canjes`
--

DROP TABLE IF EXISTS `canjes`;
CREATE TABLE `canjes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `costo` int(11) NOT NULL,
  `francoins_antes` int(11) NOT NULL,
  `francoins_despues` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `canjes_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctores` (`id`),
  CONSTRAINT `canjes_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `canjes`
--

/*!40000 ALTER TABLE `canjes` DISABLE KEYS */;
INSERT INTO `canjes` (`id`,`doctor_id`,`producto_id`,`costo`,`francoins_antes`,`francoins_despues`,`fecha`) VALUES 
 (1,1,3,150,180,30,'2026-04-12 10:47:30'),
 (2,3,3,150,150,0,'2026-04-12 10:59:33'),
 (3,1,4,30,30,0,'2026-04-12 16:22:55'),
 (4,1,3,150,300,150,'2026-04-12 16:24:58'),
 (5,1,4,30,150,120,'2026-04-12 16:25:14'),
 (6,1,4,30,120,90,'2026-04-12 16:26:29');
/*!40000 ALTER TABLE `canjes` ENABLE KEYS */;


--
-- Definition of table `doctores`
--

DROP TABLE IF EXISTS `doctores`;
CREATE TABLE `doctores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `codigo` varchar(50) DEFAULT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `telefono` varchar(50) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `francoins` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `doctores`
--

/*!40000 ALTER TABLE `doctores` DISABLE KEYS */;
INSERT INTO `doctores` (`id`,`nombre`,`especialidad`,`codigo`,`correo`,`telefono`,`foto`,`francoins`) VALUES 
 (1,'Dr. José Pérez','Cardiología','DOC001','perez@cmsf.com','0414-1234567','/assets/medicos/perez.png',90),
 (2,'Dra. Gómez','Pediatría','DOC002','gomez@cmsf.com','0414-9876543','/assets/medicos/gomez.png',80),
 (3,'Dr. Mario López','Traumatología','DOC003','lopez@cmsf.com','0414-5556677','/assets/medicos/mlopez.jpg',0);
/*!40000 ALTER TABLE `doctores` ENABLE KEYS */;


--
-- Definition of table `productos`
--

DROP TABLE IF EXISTS `productos`;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(150) NOT NULL,
  `costo` int(11) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productos`
--

/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` (`id`,`nombre`,`costo`,`imagen`,`activo`) VALUES 
 (1,'Tensiómetro Omron5000',350,'/assets/productos/tensiometro.png',1),
 (2,'Glucómetro VidaCheck',250,'/assets/productos/glucometro.png',1),
 (3,'Oxímetro Digital',150,'/assets/productos/oximetro.webp',1),
 (4,'Inyectadora Diamond',30,'/assets/productos/inyectadora.webp',1);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;


--
-- Definition of table `servicios`
--

DROP TABLE IF EXISTS `servicios`;
CREATE TABLE `servicios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `doctor_id` int(11) NOT NULL,
  `hospitalizaciones` int(11) DEFAULT '0',
  `consultas` int(11) DEFAULT '0',
  `cirugias` int(11) DEFAULT '0',
  `mes` varchar(50) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `servicios_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctores` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `servicios`
--

/*!40000 ALTER TABLE `servicios` DISABLE KEYS */;
INSERT INTO `servicios` (`id`,`doctor_id`,`hospitalizaciones`,`consultas`,`cirugias`,`mes`,`fecha_registro`) VALUES 
 (1,1,5,20,2,'Septiembre 2023','2026-03-22 22:45:45'),
 (2,2,3,15,1,'Septiembre 2023','2026-03-22 22:45:45'),
 (3,3,7,25,4,'Septiembre 2023','2026-03-22 22:45:45');
/*!40000 ALTER TABLE `servicios` ENABLE KEYS */;


--
-- Definition of table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tipo` enum('administrador','doctor','auditor') NOT NULL,
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `doctor_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`usuario`),
  KEY `fk_usuario_doctor` (`doctor_id`),
  CONSTRAINT `fk_usuario_doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctores` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` (`id`,`usuario`,`password`,`tipo`,`creado_en`,`doctor_id`) VALUES 
 (1,'admin','admin','administrador','2026-03-22 22:45:45',NULL),
 (2,'jperez','123','doctor','2026-03-22 22:45:45',1),
 (3,'auditor','123','auditor','2026-03-22 22:45:45',NULL),
 (4,'Gladys Ripley','12345678','administrador','2026-03-29 17:35:24',NULL),
 (5,'mlopez','54321','doctor','2026-03-29 17:35:24',3);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
