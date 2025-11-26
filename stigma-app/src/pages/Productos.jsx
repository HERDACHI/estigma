// src/pages/Productos.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Productos.css";

function Productos() {
  const [productos] = useState([
    { id: 1, nombre: "Tensiometro", valor: 50, activo: true },
    { id: 2, nombre: "Glucometro", valor: 30, activo: false },
  ]);

  const navigate = useNavigate();

  return (
    <div className="page-card">
      <h2>Listado de Productos</h2>

      <table className="productos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto</th>
            <th>Valor (Francois)</th>
            <th>Activo</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.valor}</td>
              <td>{p.activo ? "Sí" : "No"}</td>
              <td>
                <input
                  type="radio"
                  name="editar"
                  onChange={() =>
                    navigate(`/productos/editar/${p.id}`, { state: { producto: p } })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botón Agregar al final */}
      <div className="productos-actions">
        <button
          className="productos-agregar-btn"
          onClick={() => navigate("/productos/crear")}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}

export default Productos;



