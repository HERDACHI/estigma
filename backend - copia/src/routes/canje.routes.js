import express from "express";
import { canjearProducto } from "../controllers/canje.controller.js";

const router = express.Router();

router.post("/", canjearProducto);

export default router;

