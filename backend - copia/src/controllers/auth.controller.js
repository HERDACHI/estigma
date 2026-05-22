import { db } from "../config/db.js";

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE usuario = ? AND password = ?",
    [usuario, password]
  );

  if (rows.length === 0) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }

  const user = rows[0];

  res.json({
    mensaje: "Login exitoso",
    tipo: user.tipo,
    usuario: user.usuario,
  });
};
