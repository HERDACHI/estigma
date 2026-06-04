import { db } from "../config/db.js";

export const canjearProducto = async (req, res) => {
  try {
    const { doctor_id, producto_id } = req.body;

    // 1. Obtener producto
    const [prodRows] = await db.query(
      "SELECT id, nombre, costo, activo FROM productos WHERE id = ?",
      [producto_id]
    );

    if (prodRows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const producto = prodRows[0];

    if (!producto.activo) {
      return res.status(400).json({ mensaje: "Producto no disponible" });
    }

    // 2. Obtener doctor
    const [docRows] = await db.query(
      "SELECT id, nombre, francoins FROM doctores WHERE id = ?",
      [doctor_id]
    );

    if (docRows.length === 0) {
      return res.status(404).json({ mensaje: "Doctor no encontrado" });
    }

    const doctor = docRows[0];

    // 3. Validar saldo
    const francoinsAntes = doctor.francoins;
    const francoinsDespues = doctor.francoins - producto.costo;

    if (doctor.francoins < producto.costo) {
      return res.status(400).json({ mensaje: "Saldo insuficiente" });
    }



    // 4. Actualizar saldo
    await db.query(
      "UPDATE doctores SET francoins = ? WHERE id = ?",
      [francoinsDespues, doctor_id]
    );

    // 5. Registrar canje
    await db.query(
      `INSERT INTO canjes 
        (doctor_id, producto_id, costo, francoins_antes, francoins_despues)
       VALUES (?, ?, ?, ?, ?)`,
      [doctor_id, producto_id, producto.costo, francoinsAntes, francoinsDespues]
    );

    res.json({
      mensaje: "Canje exitoso",
      francoins_restantes: francoinsDespues,
    });

  } catch (error) {
    console.error("Error en canje:", error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
