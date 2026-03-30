import express from "express";
import {
  obtenerAuditoria,
  obtenerAuditoriaPorId,
  crearAuditoria
} from "../controllers/auditoria.controller.js";

const router = express.Router();

// Obtener todos los registros
router.get("/", obtenerAuditoria);

// Obtener un registro por ID
router.get("/:id", obtenerAuditoriaPorId);

// Crear un registro de auditoría
router.post("/", crearAuditoria);

export default router;




