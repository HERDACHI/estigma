import express from "express";

import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId
} from "../controllers/usuarios.controller.js";

const router = express.Router();


// GET → obtener todos los usuarios
router.get("/", obtenerUsuarios);

// POST → crear usuario
router.post("/", crearUsuario);

// PUT → actualizar usuario
router.put("/:id", actualizarUsuario);

// DELETE → eliminar usuario
router.delete("/:id", eliminarUsuario);

// GET → obtener todos los usuarios
router.get("/", obtenerUsuarios);

// GET → obtener un usuario por ID
router.get("/:id", obtenerUsuarioPorId);

// POST → crear usuario
router.post("/", crearUsuario);

// PUT → actualizar usuario
router.put("/:id", actualizarUsuario);

// DELETE → eliminar usuario
router.delete("/:id", eliminarUsuario);



export default router;
