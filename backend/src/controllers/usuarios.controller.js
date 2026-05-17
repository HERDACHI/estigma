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

    let {
      usuario,
      password,
      tipo,
      nombre,
      especialidad,
      correo,
      telefono
    } = req.body;

    // Normalizar tipo
    const tipoNormalizado = (tipo || "").toLowerCase().trim();

    // Obtener usuario actual
    const [[usuarioActual]] = await db.query(
      "SELECT * FROM usuarios WHERE id = ?",
      [usuario_id]
    );

    if (!usuarioActual) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // FOTO
    let nuevaFoto = null;

    if (req.file) {
      nuevaFoto = `/assets/usuarios/${req.file.filename}`;
    }

    // ============================
    // ACTUALIZAR TABLA USUARIOS
    // ============================
    const camposUsuario = [];
    const valoresUsuario = [];

    if (usuario) {
      camposUsuario.push("usuario = ?");
      valoresUsuario.push(usuario);
    }

    if (password) {
      camposUsuario.push("password = ?");
      valoresUsuario.push(password);
    }

    camposUsuario.push("tipo = ?");
    valoresUsuario.push(tipoNormalizado);

    camposUsuario.push("doctor_id = ?");
    valoresUsuario.push(tipoNormalizado === "doctor" ? usuarioActual.doctor_id : null);

    valoresUsuario.push(usuario_id);

    await db.query(
      `UPDATE usuarios SET ${camposUsuario.join(", ")} WHERE id = ?`,
      valoresUsuario
    );

    // ============================
    // SI ES DOCTOR → ACTUALIZAR TABLA DOCTORES
    // ============================
    if (tipoNormalizado === "doctor") {
      // Si no existe doctor_id → crear doctor
      if (!usuarioActual.doctor_id) {
        const [doctorResult] = await db.query(
          `INSERT INTO doctores (nombre, especialidad, correo, telefono, foto, francoins)
           VALUES (?, ?, ?, ?, ?, 0)`,
          [nombre, especialidad, correo, telefono, nuevaFoto]
        );

        // Actualizar doctor_id en usuarios
        await db.query(
          "UPDATE usuarios SET doctor_id = ? WHERE id = ?",
          [doctorResult.insertId, usuario_id]
        );
      } else {
        // Actualizar doctor existente
        const camposDoctor = [];
        const valoresDoctor = [];

        if (nombre) {
          camposDoctor.push("nombre = ?");
          valoresDoctor.push(nombre);
        }

        if (especialidad) {
          camposDoctor.push("especialidad = ?");
          valoresDoctor.push(especialidad);
        }

        if (correo) {
          camposDoctor.push("correo = ?");
          valoresDoctor.push(correo);
        }

        if (telefono) {
          camposDoctor.push("telefono = ?");
          valoresDoctor.push(telefono);
        }

        if (nuevaFoto) {
          camposDoctor.push("foto = ?");
          valoresDoctor.push(nuevaFoto);
        }

        valoresDoctor.push(usuarioActual.doctor_id);

        await db.query(
          `UPDATE doctores SET ${camposDoctor.join(", ")} WHERE id = ?`,
          valoresDoctor
        );
      }
    }

    // ============================
    // SI YA NO ES DOCTOR → ELIMINAR REGISTRO EN DOCTORES
    // ============================
    if (tipoNormalizado !== "doctor" && usuarioActual.doctor_id) {
      await db.query("DELETE FROM doctores WHERE id = ?", [
        usuarioActual.doctor_id,
      ]);

      await db.query("UPDATE usuarios SET doctor_id = NULL WHERE id = ?", [
        usuario_id,
      ]);
    }

    res.json({ mensaje: "Usuario actualizado correctamente" });

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

