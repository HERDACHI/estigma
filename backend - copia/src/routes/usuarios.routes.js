// src/routes/usuarios.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId
} from "../controllers/usuarios.controller.js";

const router = express.Router();

// Necesario para rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Carpeta para fotos de usuarios
const uploadPath = path.join(__dirname, "../../../stigma-app/public/assets/usuarios");

// Multer ANÁLOGO a productos
const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ storage });

// =======================
// RUTAS DE USUARIOS
// =======================

// GET → obtener todos los usuarios
router.get("/", obtenerUsuarios);

// GET → obtener un usuario por ID
router.get("/:id", obtenerUsuarioPorId);

// POST → crear usuario con foto
router.post("/", upload.single("foto"), crearUsuario);

// PUT → actualizar usuario con foto opcional
router.put("/:id", upload.single("foto"), actualizarUsuario);

// DELETE → eliminar usuario
router.delete("/:id", eliminarUsuario);

export default router;

