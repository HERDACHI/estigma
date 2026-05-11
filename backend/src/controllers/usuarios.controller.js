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
    const { usuario, password, tipo, nombre, especialidad, correo, telefono } = req.body;

    const foto = req.file
      ? `/assets/usuarios/${req.file.filename}`
      : null;

    if (!usuario || !password || !tipo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    let doctor_id = null;
    
    // Si es doctor → crear registro en doctores
    let tipoNormalizado = (tipo || "").toLowerCase().trim();

    if (tipoNormalizado === "doctor") {
      const [doctorResult] = await db.query(
        `INSERT INTO doctores (nombre, especialidad, correo, telefono, foto, francoins)
         VALUES (?, ?, ?, ?, ?, 0)`,
        [nombre, especialidad, correo, telefono, foto]
      );

      doctor_id = doctorResult.insertId;
    }

    // Crear usuario
    await db.query(
      `INSERT INTO usuarios (usuario, password, tipo, doctor_id)
       VALUES (?, ?, ?, ?)`,
      [usuario, password, tipo, doctor_id]
    );

    res.json({ mensaje: "Usuario creado correctamente", doctor_id });

  } catch (error) {
    console.error("ERROR CREANDO USUARIO:", error);
    res.status(500).json({ mensaje: "Error creando usuario" });
  }
};


export const crearUsuario_old = async (req, res) => {
  try {
    const { nombre, cedula, tipo, activo } = req.body;

    const foto = req.file
      ? `/assets/usuarios/${req.file.filename}`
      : null;

    if (!nombre || !cedula || !tipo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const [result] = await db.query(
      `INSERT INTO usuarios (nombre, cedula, tipo, activo, foto)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, cedula, tipo, activo, foto]
    );

    const usuario_id = result.insertId;

    if (tipo === "Doctor") {
      await db.query(
        `INSERT INTO doctores (id, nombre, francoins)
         VALUES (?, ?, 0)`,
        [usuario_id, nombre]
      );
    }

    res.json({
      mensaje: "Usuario creado correctamente",
      usuario_id,
      foto
    });

  } catch (error) {
    console.error("ERROR CREANDO USUARIO:", error);
    res.status(500).json({ mensaje: "Error creando usuario" });
  }
};


// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const usuario_id = req.params.id;
    const { nombre, cedula, tipo, activo } = req.body;

    // Obtener usuario actual
    const [[usuarioActual]] = await db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [usuario_id]
    );

    if (!usuarioActual) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Si subieron nueva foto → generar ruta
    let nuevaFoto = usuarioActual.foto;

    if (req.file) {
      nuevaFoto = `/assets/usuarios/${req.file.filename}`;

      // Eliminar foto anterior si existía
      if (usuarioActual.foto) {
        const rutaAnterior = path.join(
          process.cwd(),
          "stigma-app/public",
          usuarioActual.foto
        );

        if (fs.existsSync(rutaAnterior)) {
          fs.unlinkSync(rutaAnterior);
        }
      }
    }

    // Actualizar usuario
    await db.query(
      `UPDATE usuarios
       SET nombre = ?, cedula = ?, tipo = ?, activo = ?, foto = ?
       WHERE id = ?`,
      [nombre, cedula, tipo, activo, nuevaFoto, usuario_id]
    );

    // Si es doctor y no existe → crearlo
    if (tipo === "Doctor") {
      await db.query(
        `INSERT IGNORE INTO doctores (id, nombre, francoins)
         VALUES (?, ?, 0)`,
        [usuario_id, nombre]
      );
    }

    // Si dejó de ser doctor → eliminarlo de doctores
    if (tipo !== "Doctor") {
      await db.query("DELETE FROM doctores WHERE id = ?", [usuario_id]);
    }

    res.json({
      mensaje: "Usuario actualizado correctamente",
      foto: nuevaFoto
    });

  } catch (error) {
    console.error("ERROR ACTUALIZANDO USUARIO:", error);
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

