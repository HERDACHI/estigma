import React, { useState } from "react";
import "./AuditorForm.css";

function AuditorForm({ onAuditar }) {
  const [datos, setDatos] = useState({ usuario: "", clave: "" });

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuditar(datos);
  };

  return (
    <div className="auditor-wrapper">
      <div className="auditor-card">
        {/* Logo CMSF */}
        <img
          src="/assets/logo-cmsf.png"
          alt="Logo CMSF"
          className="auditor-logo"
        />

        {/* Texto centrado */}
        <h2 className="auditor-title">Acceso Auditor</h2>

        <form className="auditor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="usuario"
            placeholder="Usuario Auditor"
            value={datos.usuario}
            onChange={handleChange}
          />
          <input
            type="password"
            name="clave"
            placeholder="Clave"
            value={datos.clave}
            onChange={handleChange}
          />
          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default AuditorForm;
