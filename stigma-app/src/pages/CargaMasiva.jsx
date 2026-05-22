// src/pages/CargaMasiva.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./CargaMasiva.css";

function CargaMasiva() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.data || []);
  const [procesando, setProcesando] = useState(false);

  // Leer archivo Excel
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

      setData(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  // Procesar archivo → enviar al backend
  const handleProcesarArchivo = async () => {
    if (data.length === 0) {
      alert("Debe cargar un archivo Excel primero.");
      return;
    }

    const usuario_id = localStorage.getItem("idUsuario");

    if (!usuario_id) {
      alert("Error: no se encontró el usuario logueado.");
      return;
    }

    setProcesando(true);

    try {
      const res = await fetch("http://5.252.53.211:3001/api/auditoria/carga-masiva", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filas: data,
          usuario_id
        })
      });

      const respuesta = await res.json();

      if (!res.ok) {
        alert("Error procesando archivo: " + respuesta.mensaje);
        setProcesando(false);
        return;
      }

      // Mostrar resumen
      const exitos = respuesta.resultados.filter(r => r.estado === "OK").length;
      const errores = respuesta.resultados.filter(r => r.estado === "ERROR").length;

      alert(`✔ Carga masiva completada:
- Registros procesados: ${data.length}
- Éxitos: ${exitos}
- Errores: ${errores}`);

      navigate("/auditoria");

    } catch (error) {
      console.error("ERROR EN CARGA MASIVA:", error);
      alert("Error en el servidor");
    }

    setProcesando(false);
  };

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

      <div className="form-actions">
        <button
          className="procesar-btn"
          onClick={handleProcesarArchivo}
          disabled={procesando}
        >
          {procesando ? "Procesando..." : "Procesar Archivo"}
        </button>

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

