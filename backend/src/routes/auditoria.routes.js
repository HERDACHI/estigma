import express from "express";

import {
  obtenerAuditoria,
  obtenerAuditoriaPorId,
  crearAuditoria,
  actualizarServiciosYFrancoins
} from "../controllers/auditoria.controller.js";

const router = express.Router();

// Obtener todos los registros
router.get("/", obtenerAuditoria);

// Obtener un registro por ID
router.get("/:id", obtenerAuditoriaPorId);

// Crear un registro de auditoría
router.post("/", crearAuditoria);

// Actualizar servicios medicos ó Francoins
router.put("/actualizar-servicios", actualizarServiciosYFrancoins);

export default router;











