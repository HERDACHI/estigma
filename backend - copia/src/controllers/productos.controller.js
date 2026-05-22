import { db } from "../config/db.js";

export const obtenerProductos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM productos");
  res.json(rows);
};

// Obtener producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, nombre, costo, imagen, activo FROM productos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo producto" });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, costo, activo } = req.body;

    // Nombre del archivo físico
    const fileName = req.file ? req.file.filename : null;

    // Ruta que se guardará en la BD
    const imagen = fileName ? `/assets/productos/${fileName}` : null;

    if (!nombre || !costo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    await db.query(
      "INSERT INTO productos (nombre, costo, imagen, activo) VALUES (?, ?, ?, ?)",
      [nombre, costo, imagen, activo]
    );

    res.json({ mensaje: "Producto creado correctamente" });

  } catch (error) {
    console.error("ERROR CREANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error creando producto" });
  }
};


// Actualizar producto por ID
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, costo, activo } = req.body;
    const imagen = req.file ? req.file.filename : req.body.imagen;

    const [result] = await db.query(
      "UPDATE productos SET nombre = ?, costo = ?, imagen = ?, activo = ? WHERE id = ?",
      [nombre, costo, imagen, activo, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("ERROR ACTUALIZANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error actualizando producto" });
  }
};

// Eliminar producto por ID
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("ERROR ELIMINANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error eliminando producto" });
  }
};





/*import { db } from "../config/db.js";

export const obtenerProductos = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM productos");
  res.json(rows);
};




export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT id, nombre, costo, imagen FROM productos WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error obteniendo producto" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const { nombre, costo, imagen } = req.body;

    if (!nombre || !costo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    await db.query(
      "INSERT INTO productos (nombre, costo, imagen) VALUES (?, ?, ?)",
      [nombre, costo, imagen]
    );

    res.json({ mensaje: "Producto creado correctamente" });
  } catch (error) {
    console.error("ERROR CREANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error creando producto" });
  }
};


export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, costo, imagen } = req.body;

    if (!nombre || !costo) {
      return res.status(400).json({ mensaje: "Faltan datos obligatorios" });
    }

    const [result] = await db.query(
      "UPDATE productos SET nombre = ?, costo = ?, imagen = ? WHERE id = ?",
      [nombre, costo, imagen, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto actualizado correctamente" });
  } catch (error) {
    console.error("ERROR ACTUALIZANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error actualizando producto" });
  }
};


export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM productos WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("ERROR ELIMINANDO PRODUCTO:", error);
    res.status(500).json({ mensaje: "Error eliminando producto" });
  }
};
*/