// src/pages/GestionServicios.jsx
import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "./GestionServicios.css";

function GestionServicios() {
  const { id } = useParams(); // doctor_id
  const location = useLocation();
  const navigate = useNavigate();

  const nombreDoctor = location.state?.nombre || "Doctor desconocido";

  const [hospitalizaciones, setHospitalizaciones] = useState(0);
  const [consultas, setConsultas] = useState(0);
  const [cirugias, setCirugias] = useState(0);
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
          hospitalizaciones: Number(hospitalizaciones),
          consultas: Number(consultas),
          cirugias: Number(cirugias),
          motivo,
          usuario_id
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + data.mensaje);
        return;
      }

      alert(`✔ Servicios actualizados correctamente para:
${nombreDoctor}
Acción: ${accion}
Hospitalizaciones: ${hospitalizaciones}
Consultas: ${consultas}
Cirugías: ${cirugias}`);

      navigate("/auditoria");

    } catch (error) {
      console.error("ERROR EN GESTION SERVICIOS:", error);
      alert("Error en el servidor");
    }
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
            required
          />
        </label>

        <label>
          Consultas:
          <input
            type="number"
            value={consultas}
            onChange={(e) => setConsultas(e.target.value)}
            required
          />
        </label>

        <label>
          Cirugías:
          <input
            type="number"
            value={cirugias}
            onChange={(e) => setCirugias(e.target.value)}
            required
          />
        </label>

        <label>
          Tipo de acción:
          <select value={accion} onChange={(e) => setAccion(e.target.value)}>
            <option value="ADICION">Adición</option>
            <option value="AJUSTE">Ajuste</option>
          </select>
        </label>

        <label>
          Motivo del cambio:
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej: Carga mensual, corrección, etc."
          />
        </label>

        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default GestionServicios;
