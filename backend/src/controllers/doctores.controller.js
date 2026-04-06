import { db } from "../config/db.js";

export const obtenerRanking = async (req, res) => {
  const [rows] = await db.query(`
    SELECT d.id, d.nombre, d.especialidad, d.francoins,
           s.hospitalizaciones, s.consultas, s.cirugias,
           (s.hospitalizaciones + s.consultas + s.cirugias) AS totalServicios
    FROM doctores d
    LEFT JOIN servicios s ON d.id = s.doctor_id
    ORDER BY totalServicios DESC;
  `);

  res.json(rows);
};

export const obtenerDoctorPorId_old = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM doctores WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error obteniendo doctor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

export const obtenerDoctorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT 
        d.id,
        d.nombre,
        d.especialidad,
        d.codigo,
        d.correo,
        d.telefono,
        d.foto,
        d.francoins,
        COALESCE(SUM(s.hospitalizaciones), 0) AS hospitalizaciones,
        COALESCE(SUM(s.consultas), 0) AS consultas,
        COALESCE(SUM(s.cirugias), 0) AS cirugias
      FROM doctores d
      LEFT JOIN servicios s ON d.id = s.doctor_id
      WHERE d.id = ?
      GROUP BY d.id`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Doctor no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error obteniendo doctor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
