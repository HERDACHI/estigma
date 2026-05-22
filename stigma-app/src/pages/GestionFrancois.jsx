// src/pages/GestionFrancois.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./GestionFrancois.css";

function GestionFrancois() {
  const { id } = useParams(); // ID del doctor
  const location = useLocation();
  const navigate = useNavigate();

  const nombreDoctor = location.state?.nombre || "Doctor desconocido";

  const [francois, setFrancois] = useState(0);
  const [accion, setAccion] = useState("ADICION");
  const [motivo, setMotivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usuario_id = localStorage.getItem("idUsuario");

    if (!usuario_id) {
      alert("Error: no se encontró el usuario logueado.");
      return;
    }

    try {
      const res = await fetch("http://5.252.53.211:3001/api/auditoria/actualizar-servicios", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctor_id: id,
          tipo: accion,
          francoins: Number(francois),
          motivo,
          usuario_id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.mensaje);
        return;
      }

      alert(`✔ Operación realizada correctamente:
${accion} de ${francois} francoins
Doctor: ${nombreDoctor}`);

      navigate("/auditoria");

    } catch (error) {
      console.error("ERROR EN GESTION FRANCOIS:", error);
      alert("Error en el servidor");
    }
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
            required
          />
        </label>

        <label>
          Tipo de acción:
          <select
            value={accion}
            onChange={(e) => setAccion(e.target.value)}
          >
            <option value="ADICION">Adición de Francois</option>
            <option value="AJUSTE">Ajuste de Francois</option>
          </select>
        </label>

        <label>
          Motivo del cambio:
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej: Bonificación, corrección, etc."
          />
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GestionFrancois;


/*
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

*/
