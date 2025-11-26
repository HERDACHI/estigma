// src/pages/Usuarios.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // 👈 importar navigate
import "./Usuarios.css";

function Usuarios() {
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: "",
    cedula: "",
    tipo: "Doctor",
    activo: true,
    foto: null,
  });
  const [preview, setPreview] = useState(null);

  const tiposDisponibles = ["Doctor", "Auditor", "Administrador"];
  const navigate = useNavigate();   // 👈 inicializar navigate

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setNuevoUsuario({ ...nuevoUsuario, foto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setNuevoUsuario({
        ...nuevoUsuario,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario creado:", nuevoUsuario);

    // 👇 aquí rediriges a la ventana GestionUsuarios
    navigate("/gestion-usuarios");
  };

  return (
    <div className="page-card">
      <h2>Registrar Usuario</h2>

      <form onSubmit={handleSubmit} className="usuarios-form">
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={nuevoUsuario.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Cédula/ID:
          <input
            type="text"
            name="cedula"
            value={nuevoUsuario.cedula}
            onChange={handleChange}
          />
        </label>
        <label>
          Tipo de Usuario:
          <select
            name="tipo"
            value={nuevoUsuario.tipo}
            onChange={handleChange}
          >
            {tiposDisponibles.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </label>
        <label className="checkbox-label">
          Activo:
          <input
            type="checkbox"
            name="activo"
            checked={nuevoUsuario.activo}
            onChange={handleChange}
          />
        </label>
        <label>
          Foto:
          <input type="file" name="foto" accept="image/*" onChange={handleChange} />
        </label>
        {preview && (
          <div className="preview-box">
            <img src={preview} alt="Vista previa" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="guardar-btn">Guardar</button>
          <button type="button" className="cancelar-btn" onClick={() => navigate("/gestion-usuarios")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Usuarios;
