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
