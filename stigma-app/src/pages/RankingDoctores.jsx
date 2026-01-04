// src/pages/RankingDoctores.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./RankingDoctores.css";

function RankingDoctores() {
  const navigate = useNavigate();

  // 👇 Datos simulados (JSON/arreglo)
  const doctores = [
    { id: 1, usuario: "Dr. Pérez", francois: 120, hospitalizaciones: 5, consultas: 20, cirugias: 2 },
    { id: 2, usuario: "Dra. Gómez", francois: 80, hospitalizaciones: 3, consultas: 15, cirugias: 1 },
    { id: 3, usuario: "Dr. López", francois: 150, hospitalizaciones: 7, consultas: 25, cirugias: 4 },
    { id: 4, usuario: "Dr. Ramírez", francois: 60, hospitalizaciones: 2, consultas: 10, cirugias: 0 },
    { id: 5, usuario: "Dra. Torres", francois: 200, hospitalizaciones: 8, consultas: 30, cirugias: 5 },
  ];

  // Calcular total de servicios y ordenar
  const ranking = doctores
    .map((d) => ({
      ...d,
      totalServicios: d.hospitalizaciones + d.consultas + d.cirugias,
    }))
    .sort((a, b) => b.totalServicios - a.totalServicios);

  return (
    <div className="page-card">
      <h2>Ranking de Doctores</h2>
     <div className="table-container">
      <table className="ranking-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Doctor</th>
            <th>Francois</th>
            <th>Hospitalizaciones</th>
            <th>Consultas</th>
            <th>Cirugías</th>
            <th>Total Servicios</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((doc, idx) => (
            <tr key={doc.id}>
              <td>{idx + 1}</td>
              <td>{doc.usuario}</td>
              <td>{doc.francois}</td>
              <td>{doc.hospitalizaciones}</td>
              <td>{doc.consultas}</td>
              <td>{doc.cirugias}</td>
              <td>{doc.totalServicios}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="form-actions">
        <button className="cancelar-btn" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
}

export default RankingDoctores;
