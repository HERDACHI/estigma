// src/pages/CargaMasiva.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";   // 👈 librería para leer Excel
import "./CargaMasiva.css";

function CargaMasiva() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.data || []);

  // 👇 función para leer el archivo Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const buffer = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(buffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Guardar datos en el estado para mostrarlos en la tabla
      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="page-card">
      <h2>Carga Masiva</h2>

      {/* Tabla siempre con cabecera */}
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
          {data.length > 0 ? (
            data.map((row, idx) => (
              <tr key={idx}>
                <td>{row.ID || row.id}</td>
                <td>{row.Doctor || row.usuario}</td>
                <td>{row.Francois || row.francois}</td>
                <td>{row["Ajustar/Sumar"] || row["ajustar/sumar"]}</td>
                <td>{row.Hospitalizaciones || row.hospitalizaciones}</td>
                <td>{row.Consultas || row.consultas}</td>
                <td>{row.Cirugías || row.cirujias}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", color: "#888" }}>
                No hay datos cargados. Seleccione un archivo Excel.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Botones alineados */}
      <div className="form-actions">
        <button className="procesar-btn">Procesar Archivo</button>

        {/* Botón seleccionar archivo con mismo estilo */}
        <label className="procesar-btn">
          Seleccionar Archivo
          <input
            type="file"
            accept=".xlsx, .xls"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </label>

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

