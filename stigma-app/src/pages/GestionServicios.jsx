// src/pages/GestionServicios.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./GestionServicios.css";

function GestionServicios() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const nombreDoctor = location.state?.nombre || "Doctor desconocido";

  const [hospitalizaciones, setHospitalizaciones] = useState(0);
  const [consultas, setConsultas] = useState(0);
  const [cirugias, setCirugias] = useState(0);
  const [accion, setAccion] = useState("adicion");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Se ha realizado un ${accion} de servicios al ${nombreDoctor} (ID: ${id}): 
      Hospitalizaciones: ${hospitalizaciones}, Consultas: ${consultas}, Cirugías: ${cirugias}`
    );
    navigate("/auditoria");
  };

  return (
    <div className="page-card">
      <h2>Gestionar Servicios</h2>
      <p><strong>Usuario seleccionado:</strong> {nombreDoctor}</p>

      <form className="gestion-form" onSubmit={handleSubmit}>
        <label>
          Hospitalizaciones:
          <input
            type="number"
            value={hospitalizaciones}
            onChange={(e) => setHospitalizaciones(e.target.value)}
          />
        </label>
        <label>
          Consultas:
          <input
            type="number"
            value={consultas}
            onChange={(e) => setConsultas(e.target.value)}
          />
        </label>
        <label>
          Cirugías:
          <input
            type="number"
            value={cirugias}
            onChange={(e) => setCirugias(e.target.value)}
          />
        </label>

        <label>
          Tipo de acción:
          <select value={accion} onChange={(e) => setAccion(e.target.value)}>
            <option value="adicion">Adición</option>
            <option value="ajuste">Ajuste</option>
          </select>
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GestionServicios;
