import { db } from "../config/db.js";

// Obtener todos los usuarios
export const obtenerUsuariosall = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT id, usuario, tipo, creado_en FROM usuarios");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo usuarios" });
  }
};

export const obtenerUsuarios = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  res.json(rows);
};

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { usuario, password, tipo } = req.body;

    if (!usuario || !password || !tipo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    await db.query(
      "INSERT INTO usuarios (usuario, password, tipo) VALUES (?, ?, ?)",
      [usuario, password, tipo]
    );

    res.json({ mensaje: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error creando usuario" });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, password, tipo } = req.body;

    await db.query(
      "UPDATE usuarios SET usuario = ?, password = ?, tipo = ? WHERE id = ?",
      [usuario, password, tipo, id]
    );

    res.json({ mensaje: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error actualizando usuario" });
  }
};

// Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM usuarios WHERE id = ?", [id]);

    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error eliminando usuario" });
  }
};

// Obtener un usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, usuario, tipo, creado_en FROM usuarios WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo usuario" });
  }
};



