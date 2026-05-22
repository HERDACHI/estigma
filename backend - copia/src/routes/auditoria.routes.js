import express from "express";

import {
  obtenerAuditoria,
  obtenerAuditoriaPorId,
  crearAuditoria,
  actualizarServiciosYFrancoins,
  obtenerEstatusServicios,
  procesarCargaMasiva
} from "../controllers/auditoria.controller.js";




const router = express.Router();

// Obtener todos los registros
router.get("/", obtenerAuditoria);

// Obtener estado de los servicios médicos de be ir antes de id
router.get("/estatus-servicios", obtenerEstatusServicios);

// Obtener un registro por ID
router.get("/:id", obtenerAuditoriaPorId);

// Crear un registro de auditoría
router.post("/", crearAuditoria);

// Actualizar servicios medicos ó Francoins
router.put("/actualizar-servicios", actualizarServiciosYFrancoins);

// Actualizar servicios medicos por Carga Masiva
router.post("/carga-masiva", procesarCargaMasiva);


export default router;











