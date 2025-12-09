// src/pages/CargaMasiva.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./CargaMasiva.css";

function CargaMasiva() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data || [];

  return (
    <div className="page-card">
      <h2>Carga Masiva</h2>

      <table className="carga-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Doctor</th>
            <th>Francois</th>
            <th>Ajustar/Sumar</th>
            <th>Hospitalizaciones</th>
            <th>Consultas</th>
            <th>Cirugías</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.id}</td>
              <td>{row.usuario}</td>
              <td>{row.francois}</td>
              <td>{row["ajustar/sumar"]}</td>
              <td>{row.hospitalizaciones}</td>
              <td>{row.consultas}</td>
              <td>{row.cirujias}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-actions">
        <button className="procesar-btn">Procesar Carga Masiva</button>
        <button
          className="cancelar-btn"
          onClick={() => navigate("/auditoria")}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default CargaMasiva;
