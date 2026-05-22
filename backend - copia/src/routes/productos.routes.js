import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from "../controllers/productos.controller.js";

const router = express.Router();

// Necesario para rutas absolutas en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta hacia stigma-app/public/assets/productos
const uploadPath = path.join(__dirname, "../../../stigma-app/public/assets/productos");

/*const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
}); */

const storage = multer.diskStorage({
  destination: uploadPath,
  filename: (req, file, cb) => {
    const cleanName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + cleanName);
  }
});

const upload = multer({ storage });

// Rutas
router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", upload.single("imagen"), crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
