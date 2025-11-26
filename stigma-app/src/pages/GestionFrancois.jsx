// src/pages/GestionFrancois.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./GestionFrancois.css";

function GestionFrancois() {
  const { id } = useParams(); // ID del doctor
  const location = useLocation();
  const navigate = useNavigate();

  // 👇 obtenemos el nombre desde el state
  const nombreDoctor = location.state?.nombre || "Doctor desconocido";

  const [francois, setFrancois] = useState(0);
  const [accion, setAccion] = useState("adicion");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Se ha realizado un ${accion} de ${francois} Francois al ${nombreDoctor} (ID: ${id})`
    );
    navigate("/auditoria");
  };

  return (
    <div className="page-card">
      <h2>Gestionar Francois</h2>
      <p><strong>Usuario seleccionado:</strong> {nombreDoctor}</p>

      <form className="gestion-form" onSubmit={handleSubmit}>
        <label>
          Cantidad de Francois:
          <input
            type="number"
            value={francois}
            onChange={(e) => setFrancois(e.target.value)}
          />
        </label>

        <label>
          Tipo de acción:
          <select
            value={accion}
            onChange={(e) => setAccion(e.target.value)}
          >
            <option value="adicion">Adición de Francois</option>
            <option value="ajuste">Ajuste de Francois</option>
          </select>
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GestionFrancois;


