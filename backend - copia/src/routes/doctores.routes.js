import express from "express";
import { obtenerRanking, obtenerDoctorPorId } from "../controllers/doctores.controller.js";

const router = express.Router();

router.get("/ranking", obtenerRanking);
router.get("/:id", obtenerDoctorPorId);

export default router;

