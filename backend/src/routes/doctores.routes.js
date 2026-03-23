import express from "express";
import { obtenerRanking } from "../controllers/doctores.controller.js";

const router = express.Router();

router.get("/ranking", obtenerRanking);

export default router;

