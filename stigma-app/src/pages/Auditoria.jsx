// src/pages/Auditoria.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Auditoria.css";

function Auditoria() {
  const [filtro, setFiltro] = useState("");
  const [registros, setRegistros] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  // 🔥 Cargar estado actual de servicios desde el backend
  useEffect(() => {
    const cargarEstatusServicios = async () => {
      try {
        const res = await fetch("http://5.252.53.211:3001/api/auditoria/estatus-servicios");
        const data = await res.json();
        setRegistros(data);
      } catch (error) {
        console.error("Error cargando estatus de servicios:", error);
      }
    };

    cargarEstatusServicios();
  }, []);

  // 🔍 Filtrar por nombre del doctor
  const filtrados = registros.filter(r =>
    r.nombre_doctor?.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleGestionarFrancois = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-francois/${selectedDoctor.doctor_id}`, {
      state: { nombre: selectedDoctor.nombre_doctor }
    });
  };

  const handleGestionarServicios = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-servicios/${selectedDoctor.doctor_id}`, {
      state: { nombre: selectedDoctor.nombre_doctor }
    });
  };

  const handleCargaMasiva = () => {
    navigate("/carga-masiva");
  };

  // 📥 Carga masiva desde Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      navigate("/carga-masiva", { state: { data: jsonData } });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="page-card">
      <h2>Estado Actual de Servicios Médicos</h2>

      <input
        type="text"
        placeholder="Filtrar por doctor..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="auditoria-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Doctor</th>
            <th>Francoins</th>
            <th>Hospitalizaciones</th>
            <th>Consultas</th>
            <th>Cirugías</th>
            <th>Última Actualización</th>
          </tr>
        </thead>

        <tbody>
          {filtrados.map(r => (
            <tr key={r.doctor_id}>
              <td>
                <input
                  type="radio"
                  name="doctor"
                  onChange={() => setSelectedDoctor(r)}
                  checked={selectedDoctor?.doctor_id === r.doctor_id}
                />
              </td>

              <td>{r.doctor_id}</td>
              <td>{r.nombre_doctor}</td>
              <td>{r.francoins}</td>
              <td>{r.hospitalizaciones ?? 0}</td>
              <td>{r.consultas ?? 0}</td>
              <td>{r.cirugias ?? 0}</td>
              <td>
                {r.fecha_registro
                  ? new Date(r.fecha_registro).toLocaleString()
                  : "Sin registro"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="auditoria-actions">
        <button className="gestion-btn" onClick={handleGestionarFrancois}>
          Gestionar Francois
        </button>

        <button className="gestion-btn" onClick={handleGestionarServicios}>
          Gestionar Servicios
        </button>

        <button className="gestion-btn" onClick={handleCargaMasiva}>
          Carga Masiva
        </button>
      </div>
    </div>
  );
}

export default Auditoria;


/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./Auditoria.css";

function Auditoria() {
  const [filtro, setFiltro] = useState("");
  const [registros, setRegistros] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  // 🔥 Cargar auditoría real desde el backend
  useEffect(() => {
    const cargarAuditoria = async () => {
      try {
        const res = await fetch("http://5.252.53.211:3001/api/auditoria");
        const data = await res.json();
        setRegistros(data);
      } catch (error) {
        console.error("Error cargando auditoría:", error);
      }
    };

    cargarAuditoria();
  }, []);

  // 🔍 Filtrar por nombre del doctor
  const filtrados = registros.filter(r =>
    r.nombre_doctor?.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleGestionarFrancois = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-francois/${selectedDoctor.doctor_id}`, {
      state: { nombre: selectedDoctor.nombre_doctor }
    });
  };

  const handleGestionarServicios = () => {
    if (!selectedDoctor) {
      alert("Seleccione un doctor primero");
      return;
    }
    navigate(`/gestion-servicios/${selectedDoctor.doctor_id}`, {
      state: { nombre: selectedDoctor.nombre_doctor }
    });
  };

  const handleCargaMasiva = () => {
    navigate("/carga-masiva");
  };

  // 📥 Carga masiva desde Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      navigate("/carga-masiva", { state: { data: jsonData } });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="page-card">
      <h2>Panel de Auditoría</h2>

      <input
        type="text"
        placeholder="Filtrar por usuario..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <table className="auditoria-table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Doctor</th>
            <th>Francoins</th>
            <th>Hospitalizaciones</th>
            <th>Consultas</th>
            <th>Cirugías</th>
            <th>Fecha</th>
          </tr>
        </thead>

        <tbody>
          {filtrados.map(r => (
            <tr key={r.id}>
              <td>
                <input
                  type="radio"
                  name="doctor"
                  onChange={() => setSelectedDoctor(r)}
                  checked={selectedDoctor?.id === r.id}
                />
              </td>

              <td>{r.id}</td>
              <td>{r.nombre_doctor}</td>
              <td>{r.francoins_despues}</td>
              <td>{r.hospitalizaciones_despues}</td>
              <td>{r.consultas_despues}</td>
              <td>{r.cirugias_despues}</td>
              <td>{new Date(r.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="auditoria-actions">
        <button className="gestion-btn" onClick={handleGestionarFrancois}>
          Gestionar Francois
        </button>

        <button className="gestion-btn" onClick={handleGestionarServicios}>
          Gestionar Servicios
        </button>

        <button className="gestion-btn" onClick={handleCargaMasiva}>
          Carga Masiva
        </button>
      </div>
    </div>
  );
}

export default Auditoria; */




