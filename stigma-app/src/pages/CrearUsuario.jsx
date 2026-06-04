// src/pages/CrearUsuario.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CrearUsuario.css";

function CrearUsuario() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: "",
    tipo: "Doctor",

    // Datos del doctor (solo si tipo = Doctor)
    nombre: "",
    especialidad: "",
    correo: "",
    telefono: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);

  const tiposDisponibles = ["Doctor", "Auditor", "Administrador"];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      setForm({ ...form, foto: file });
      setPreview(URL.createObjectURL(file));
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación mínima
    if (!form.usuario || !form.password) {
      alert("⚠ Debes completar usuario y password");
      return;
    }

    // Si es doctor → validar nombre
    if (form.tipo === "Doctor" && !form.nombre) {
      alert("⚠ Debes ingresar el nombre del doctor");
      return;
    }

    try {
      const fd = new FormData();

      // Datos de login
      fd.append("usuario", form.usuario);
      fd.append("password", form.password);
      fd.append("tipo", form.tipo);

      // Si es doctor → enviar datos del doctor
      if (form.tipo === "Doctor") {
        fd.append("nombre", form.nombre);
        fd.append("especialidad", form.especialidad);
        fd.append("correo", form.correo);
        fd.append("telefono", form.telefono);

        if (form.foto) fd.append("foto", form.foto);
      }

      const res = await fetch("http://5.252.53.211:3001/api/usuarios", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Error: " + data.mensaje);
        return;
      }

      alert("✔ Usuario creado correctamente");
      navigate("/usuarios");

    } catch (error) {
      console.error("ERROR CREANDO USUARIO:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="page-card">
      <h2>Crear Usuario</h2>

      <form onSubmit={handleSubmit} className="usuarios-form">

        <h3>Datos de Login</h3>

        <div className="form-group">
          <label>Usuario (login):</label>
          <input
            type="text"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tipo de Usuario:</label>
         
          <select name="tipo" value={form.tipo} onChange={handleChange}>
            <option value="doctor">Doctor</option>
            <option value="auditor">Auditor</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        {form.tipo === "Doctor" && (
          <>
            <h3>Datos del Doctor</h3>

            <div className="form-group">
              <label>Nombre completo:</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required={form.tipo === "Doctor"}
              />
            </div>

            <div className="form-group">
              <label>Especialidad:</label>
              <input
                type="text"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Correo:</label>
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Teléfono:</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
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
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="guardar-btn">Guardar</button>
          <button
            type="button"
            className="cancelar-btn"
            onClick={() => navigate("/usuarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}




export default CrearUsuario;




