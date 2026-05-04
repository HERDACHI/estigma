
import { db } from "../config/db.js";



export const actualizarServiciosYFrancoins = async (req, res) => {
  try {
    const { doctor_id, tipo, francoins, hospitalizaciones, consultas, cirugias, motivo } = req.body;

    if (!doctor_id || !tipo) {
      return res.status(400).json({ mensaje: "doctor_id y tipo son obligatorios" });
    }

    const tipoAccion = tipo.toUpperCase();
    if (tipoAccion !== "ADICION" && tipoAccion !== "AJUSTE") {
      return res.status(400).json({ mensaje: "El tipo debe ser ADICION o AJUSTE" });
    }

    // Obtener francoins actuales del doctor
    const [doctorRows] = await db.query(
      "SELECT francoins FROM doctores WHERE id = ?",
      [doctor_id]
    );

    if (doctorRows.length === 0) {
      return res.status(404).json({ mensaje: "Doctor no encontrado" });
    }

    const francoinsAntes = doctorRows[0].francoins;

    // Obtener servicios actuales
    const [servRows] = await db.query(
      "SELECT hospitalizaciones, consultas, cirugias FROM servicios WHERE doctor_id = ?",
      [doctor_id]
    );

    const servActuales = servRows.length > 0
      ? servRows[0]
      : { hospitalizaciones: 0, consultas: 0, cirugias: 0 };

    const hospAntes = servActuales.hospitalizaciones;
    const consAntes = servActuales.consultas;
    const ciruAntes = servActuales.cirugias;

    // Cálculo según tipo de acción
    let francoinsDespues;
    let hospDespues;
    let consDespues;
    let ciruDespues;

    if (tipoAccion === "ADICION") {
      francoinsDespues = francoinsAntes + (francoins || 0);
      hospDespues = hospAntes + (hospitalizaciones || 0);
      consDespues = consAntes + (consultas || 0);
      ciruDespues = ciruAntes + (cirugias || 0);
    } else {
      // AJUSTE
      francoinsDespues = francoins ?? francoinsAntes;
      hospDespues = hospitalizaciones ?? hospAntes;
      consDespues = consultas ?? consAntes;
      ciruDespues = cirugias ?? ciruAntes;
    }

    // Actualizar francoins del doctor
    await db.query(
      "UPDATE doctores SET francoins = ? WHERE id = ?",
      [francoinsDespues, doctor_id]
    );

    // Insertar o actualizar servicios
    if (servRows.length === 0) {
      await db.query(
        "INSERT INTO servicios (doctor_id, hospitalizaciones, consultas, cirugias) VALUES (?, ?, ?, ?)",
        [doctor_id, hospDespues, consDespues, ciruDespues]
      );
    } else {
      await db.query(
        "UPDATE servicios SET hospitalizaciones = ?, consultas = ?, cirugias = ? WHERE doctor_id = ?",
        [hospDespues, consDespues, ciruDespues, doctor_id]
      );
    }

    // Registrar auditoría (histórico profesional)
    await db.query(
      `INSERT INTO auditoria (
        doctor_id,
        francoins_antes, francoins_despues,
        hospitalizaciones_antes, hospitalizaciones_despues,
        consultas_antes, consultas_despues,
        cirugias_antes, cirugias_despues,
        tipo_accion,
        motivo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        doctor_id,
        francoinsAntes, francoinsDespues,
        hospAntes, hospDespues,
        consAntes, consDespues,
        ciruAntes, ciruDespues,
        tipoAccion,
        motivo || null
      ]
    );

    res.json({
      mensaje: "Datos actualizados correctamente",
      doctor_id,
      tipo: tipoAccion,
      motivo: motivo || null,
      antes: {
        francoins: francoinsAntes,
        hospitalizaciones: hospAntes,
        consultas: consAntes,
        cirugias: ciruAntes
      },
      despues: {
        francoins: francoinsDespues,
        hospitalizaciones: hospDespues,
        consultas: consDespues,
        cirugias: ciruDespues
      }
    });

  } catch (error) {
    console.error("ERROR ACTUALIZANDO SERVICIOS Y FRANCOINS:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};


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