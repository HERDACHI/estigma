// src/pages/CrearProducto.jsx
import React, { useState } from "react";
import "./CrearProducto.css";

function CrearProducto() {
  const [form, setForm] = useState({
    foto: null,
    nombre: "",
    valor: "",
    activo: false,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, foto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto creado:", form);  
    alert("Producto creado con éxito");
    // 👇 redirigir al listado de productos
    window.location.href = "/productos";
  };

  return (
    <div className="page-card crear-container">
      <h2>Crear Producto</h2>

      {/* Recuadro fijo arriba a la derecha */}
      <div className="preview-box">

        {preview ? (
          <img src={preview} alt="Vista previa" />
        ) : (
          <span className="preview-placeholder">Sin imagen seleccionada</span>
        )}
      </div>

      <form className="crear-form" onSubmit={handleSubmit}>
        {/* Botón institucional para seleccionar archivo */}
        <label className="file-label">
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />
          <div className="preview-title">Foto:</div>
          <span className="file-btn">Seleccionar</span>
        </label>

        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Valor (Francois):
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
          />
        </label>
        <label className="checkbox-label">

        </label>

        <div className="botones-container">
          <button type="submit" className="guardar-btn">Guardar</button>
        </div>
      </form>
    </div>
  );
}

export default CrearProducto;
