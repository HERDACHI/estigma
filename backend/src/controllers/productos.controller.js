import { db } from "../config/db.js";

export const obtenerProductos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM productos");
  res.json(rows);
};
