import { db } from "../config/db.js";

// Obtener toda la auditoría
export const obtenerAuditoria = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, doctor_id, francoins, hospitalizaciones, consultas, cirugias, fecha FROM auditoria ORDER BY fecha DESC"
    );
    res.json(rows);
  } catch (error) {
    console.error("ERROR AUDITORIA:", error);
    res.status(500).json({ mensaje: "Error obteniendo auditoría" });
  }
};

// Obtener auditoría por ID
export const obtenerAuditoriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, doctor_id, francoins, hospitalizaciones, consultas, cirugias, fecha FROM auditoria WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Registro no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("ERROR AUDITORIA:", error);
    res.status(500).json({ mensaje: "Error obteniendo auditoría" });
  }
};

// Crear registro de auditoría
export const crearAuditoria = async (req, res) => {
  try {
    const { doctor_id, francoins, hospitalizaciones, consultas, cirugias } = req.body;

    if (!doctor_id || francoins === undefined) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    await db.query(
      "INSERT INTO auditoria (doctor_id, francoins, hospitalizaciones, consultas, cirugias) VALUES (?, ?, ?, ?, ?)",
      [doctor_id, francoins, hospitalizaciones, consultas, cirugias]
    );

    res.json({ mensaje: "Registro de auditoría creado" });
  } catch (error) {
    console.error("ERROR AUDITORIA:", error);
    res.status(500).json({ mensaje: "Error creando registro" });
  }
};
