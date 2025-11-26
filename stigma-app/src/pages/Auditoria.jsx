// src/pages/Auditoria.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auditoria.css";

function Auditoria() {
  const [filtro, setFiltro] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  const registros = [
    { id: 1, usuario: "Dr. Pérez", francois: 120, hospitalizaciones: 5, consultas: 20, cirugias: 2, fecha: "2025-11-20" },
    { id: 2, usuario: "Dra. Gómez", francois: 80, hospitalizaciones: 3, consultas: 15, cirugias: 1, fecha: "2025-11-21" },
    { id: 3, usuario: "Dr. López", francois: 150, hospitalizaciones: 7, consultas: 25, cirugias: 4, fecha: "2025-11-22" },
  ];

  const filtrados = registros.filter(r =>
    r.usuario.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleGestionarFrancois = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-francois/${selectedDoctor.id}`, {
      state: { nombre: selectedDoctor.usuario }
    });
  };

  const handleGestionarServicios = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-servicios/${selectedDoctor.id}`, {
      state: { nombre: selectedDoctor.usuario }
    });
  };

  return (
    <div className="page-card">
      <h2>Panel de Auditoría</h2>
      <input
        type="text"
        placeholder="Filtrar por usuario..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="auditoria-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Usuario</th>
            <th>Francois Acumulados</th>
            <th>Hospitalizaciones</th>
            <th>Consultas</th>
            <th>Cirugías</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filtrados.map(r => (
            <tr key={r.id}>
              <td>
                <input
                  type="radio"
                  name="doctor"
                  onChange={() => setSelectedDoctor(r)}
                  checked={selectedDoctor?.id === r.id}
                />
              </td>
              <td>{r.id}</td>
              <td>{r.usuario}</td>
              <td>{r.francois}</td>
              <td>{r.hospitalizaciones}</td>
              <td>{r.consultas}</td>
              <td>{r.cirugias}</td>
              <td>{r.fecha}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="auditoria-actions">
        <button className="gestion-btn" onClick={handleGestionarFrancois}>
          Gestionar Francois
        </button>
        <button className="gestion-btn" onClick={handleGestionarServicios}>
          Gestionar Servicios
        </button>
      </div>
    </div>
  );
}

export default Auditoria;


