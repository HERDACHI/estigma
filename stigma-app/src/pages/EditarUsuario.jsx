// src/pages/EditarUsuario.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import "./EditarUsuario.css";

function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    usuario: "",
    password: "",
    tipo: "",
    doctor_id: null,

    // Datos del doctor
    nombre: "",
    especialidad: "",
    correo: "",
    telefono: "",
    foto: null,
  });

  const [preview, setPreview] = useState(null);

  // ============================
  // CARGAR DATOS DEL USUARIO
  // ============================
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // 1. Obtener usuario
        const resUser = await fetch(`http://5.252.53.211:3001/api/usuarios/${id}`);
        const user = await resUser.json();

        if (!user) {
          alert("Usuario no encontrado");
          navigate("/gestion-usuarios");
          return;
        }

        let doctorData = {};

        // 2. Si es doctor → cargar datos del doctor
        if (user.tipo === "doctor" && user.doctor_id) {
          const resDoctor = await fetch(
            `http://5.252.53.211:3001/api/doctores/${user.doctor_id}`
          );
          doctorData = await resDoctor.json();
        }

        setForm({
          usuario: user.usuario,
          password: "", // opcional
          tipo: user.tipo,
          doctor_id: user.doctor_id,

          nombre: doctorData.nombre || "",
          especialidad: doctorData.especialidad || "",
          correo: doctorData.correo || "",
          telefono: doctorData.telefono || "",
          foto: null,
        });

        if (doctorData.foto) {
          setPreview(`http://5.252.53.211:3001${doctorData.foto}`);
        }

      } catch (error) {
        console.error("ERROR CARGANDO DATOS:", error);
      }
    };

    cargarDatos();
  }, [id, navigate]);

  // ============================
  // MANEJAR CAMBIOS
  // ============================
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

  // ============================
  // GUARDAR CAMBIOS
  // ============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // Datos del usuario
      fd.append("usuario", form.usuario);
      if (form.password) fd.append("password", form.password);
      fd.append("tipo", form.tipo);

      // Si es doctor → enviar datos del doctor
      if (form.tipo === "doctor") {
        fd.append("nombre", form.nombre);
        fd.append("especialidad", form.especialidad);
        fd.append("correo", form.correo);
        fd.append("telefono", form.telefono);

        if (form.foto) fd.append("foto", form.foto);
      }

      const res = await fetch(`http://5.252.53.211:3001/api/usuarios/${id}`, {
        method: "PUT",
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        alert("❌ Error: " + data.mensaje);
        return;
      }

      alert("✔ Usuario actualizado correctamente");
      navigate("/gestion-usuarios");

    } catch (error) {
      console.error("ERROR ACTUALIZANDO:", error);
      alert("Error en el servidor");
    }
  };

  return (
    <div className="page-card">
      <h2>Editar Usuario</h2>

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
          <label>Nueva contraseña (opcional):</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
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

        {form.tipo === "doctor" && (
          <>
            <h3>Datos del Doctor</h3>

            <div className="form-group">
              <label>Nombre completo:</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
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
          <button type="submit" className="guardar-btn">Guardar Cambios</button>
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

export default EditarUsuario;
