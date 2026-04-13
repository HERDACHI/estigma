// src/pages/Productos.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Productos.css";

function Productos() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

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
              <td>{p.costo}</td>
              <td>{p.activo ? "Sí" : "No"}</td>
              <td>
                <input
                  type="radio"
                  name="editar"
                  onChange={() =>
                    navigate(`/productos/editar/${p.id}`, {
                      state: { producto: p },
                    })
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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




