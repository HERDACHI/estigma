// src/pages/CrearUsuario.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearUsuario.css";

function CrearUsuario() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    cedula: "",
    tipo: "Doctor",
    activo: true,
    foto: null,
  });
  const [preview, setPreview] = useState(null);

  const tiposDisponibles = ["Doctor", "Auditor", "Administrador"];
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setUsuario({ ...usuario, foto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setUsuario({
        ...usuario,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Usuario creado:", usuario);
    // Aquí podrías enviar el usuario a tu backend o contexto global
    navigate("/gestion-usuarios"); // 👈 volver al listado
  };

  return (
    <div className="page-card">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="usuarios-form">
        
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Cédula/ID:</label>
          <input
            type="text"
            name="cedula"
            value={usuario.cedula}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Tipo de Usuario:</label>
          <select name="tipo" value={usuario.tipo} onChange={handleChange}>
            {tiposDisponibles.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group checkbox-group">
          
        </div>

        <div className="form-group">
          <label>Foto:</label>
          <input type="file" name="foto" accept="image/*" onChange={handleChange} />
        </div>

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="Vista previa" />
          </div>
        )}

        <div className="form-actions">
          <button type="submit" className="guardar-btn">Guardar</button>
          <button
            type="button"
            className="cancelar-btn"
            onClick={() => navigate("/gestion-usuarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CrearUsuario;

