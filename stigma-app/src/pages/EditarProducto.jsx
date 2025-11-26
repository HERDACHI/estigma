// src/pages/EditarProducto.jsx
import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./EditarProducto.css";

function EditarProducto() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Producto recibido desde el listado
  const producto = location.state?.producto || {
    nombre: "",
    valor: 0,
    activo: false,
    foto: null,
  };

  const [form, setForm] = useState(producto);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setForm({ ...form, foto: file });
      setPreview(URL.createObjectURL(file)); // 👈 genera vista previa
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto editado:", form);
    alert(`Producto ${id} actualizado con éxito`);
    navigate("/productos"); // volver al listado
  };

  return (
    <div className="page-card">
      <h2>Editar Producto</h2>
      <form className="editar-form" onSubmit={handleSubmit}>
        {/* Botón institucional para seleccionar archivo */}
        <label className="file-label">
          Foto:
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
            className="file-input"
          />
          <span className="file-btn">Seleccionar</span>
        </label>

        {/* Recuadro fijo para vista previa */}
        <div className="preview-box">
          {preview ? (
            <img src={preview} alt="Vista previa" />
          ) : (
            <span className="preview-placeholder">Sin imagen seleccionada</span>
          )}
        </div>

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

        {/* Toggle moderno para Activo */}
        <label className="toggle-label">
          Activo:
          <input
            type="checkbox"
            name="activo"
            checked={form.activo}
            onChange={handleChange}
            className="toggle-input"
          />
          <span className="toggle-slider"></span>
        </label>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditarProducto;
