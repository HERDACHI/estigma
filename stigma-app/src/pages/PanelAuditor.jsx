// src/pages/PanelAuditor.jsx
import React, { useState } from "react";
import "./PanelAuditor.css";

function PanelAuditor() {
  // Datos de ejemplo
  const [auditorias, setAuditorias] = useState([
    { id: 1, usuario: "Dr. Pérez", accion: "Accedió a historial clínico", fecha: "2025-11-20" },
    { id: 2, usuario: "Dra. Gómez", accion: "Modificó receta", fecha: "2025-11-21" },
    { id: 3, usuario: "Dr. López", accion: "Exportó informe", fecha: "2025-11-22" },
  ]);

  const [filtro, setFiltro] = useState("");

  const auditoriasFiltradas = auditorias.filter((a) =>
    a.usuario.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="auditor-panel-wrapper">
      <div className="auditor-panel-card">
        <h2 className="auditor-panel-title">Panel de Auditoría</h2>

        {/* Filtro */}
        <input
          type="text"
          placeholder="Filtrar por usuario..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="auditor-filter"
        />

        {/* Tabla */}
        <table className="auditor-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Acción</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {auditoriasFiltradas.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.usuario}</td>
                <td>{a.accion}</td>
                <td>{a.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PanelAuditor;
