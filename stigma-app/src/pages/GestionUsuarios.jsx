// src/pages/GestionUsuarios.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GestionUsuarios.css";

function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  // Cargar usuarios desde el backend
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios");
        const data = await res.json();

        // Para cada usuario tipo doctor → buscar su nombre real
        const usuariosConNombre = await Promise.all(
          data.map(async (u) => {
            if (u.tipo === "doctor" && u.doctor_id) {
              try {
                const resDoctor = await fetch(
                  `http://localhost:3001/api/doctores/${u.doctor_id}`
                );
                const doctor = await resDoctor.json();

                return {
                  ...u,
                  nombre: doctor.nombre || "Sin nombre",
                };
              } catch {
                return { ...u, nombre: "Sin nombre" };
              }
            }

            // Si NO es doctor → usar el campo usuario como nombre
            return {
              ...u,
              nombre: u.usuario,
            };
          })
        );

        setUsuarios(usuariosConNombre);
      } catch (error) {
        console.error("ERROR CARGANDO USUARIOS:", error);
      }
    };

    cargarUsuarios();
  }, []);

  return (
    <div className="page-card">
      <h2>Gestión de Usuarios</h2>

      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre / Usuario</th>
            <th>Tipo</th>
            <th>Doctor ID</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.tipo}</td>
              <td>{u.doctor_id || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="agregar-btn"
        onClick={() => navigate("/crear-usuario")}
      >
        Agregar
      </button>
    </div>
  );
}

export default GestionUsuarios;



