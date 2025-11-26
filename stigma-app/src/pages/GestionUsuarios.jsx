// src/pages/GestionUsuarios.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";   // 👈 importar useNavigate
import "./GestionUsuarios.css";

function GestionUsuarios() {
  // Lista inicial de usuarios con nombre, tipo y estado
  const [usuarios] = useState([
    { id: 1, nombre: "Juan Pérez", tipo: "Doctor", activo: true },
    { id: 2, nombre: "María Gómez", tipo: "Auditor", activo: false },
    { id: 3, nombre: "Carlos Ruiz", tipo: "Administrador", activo: true },
  ]);

  const navigate = useNavigate();   // 👈 inicializar navigate

  return (
    <div className="page-card">
      <h2>Gestión de Usuarios</h2>

 

      {/* Tabla de usuarios */}
      <table className="usuarios-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Tipo de Usuario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.tipo}</td>
              <td>{u.activo ? "Activo" : "Inactivo"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        -
      </div>
        <button className="agregar-btn" onClick={() => navigate("/crear-usuario")}>
        Agregar
      </button>
    </div>
    
  );
}

export default GestionUsuarios;


