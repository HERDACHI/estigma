// src/pages/CatalogoProductos.jsx
import React, { useState } from 'react';
import './CatalogoProductos.css';
import '../assets/colores-cmsf.css';

function CatalogoProductos({ productos, onCanjear }) {
  const [filtro, setFiltro] = useState("todos");

  // Filtrar productos según el rango seleccionado
  const productosFiltrados = productos.filter((p) => {
    if (filtro === "20-100") {
      return p.costo >= 20 && p.costo <= 100;
    }
    if (filtro === "100-300") {
      return p.costo >= 100 && p.costo <= 300;
    }
    return true; // "todos"
  });

  return (
    <div className="catalogo-container">
      <h2 className="catalogo-title">Catálogo de Productos</h2>

      {/* Filtros */}
      <div className="catalogo-filtros">
        <label>
          <input
            type="radio"
            name="filtro"
            value="todos"
            checked={filtro === "todos"}
            onChange={(e) => setFiltro(e.target.value)}
          />
          Todos
        </label>
        <label>
          <input
            type="radio"
            name="filtro"
            value="20-100"
            checked={filtro === "20-100"}
            onChange={(e) => setFiltro(e.target.value)}
          />
          20 - 100 FR
        </label>
        <label>
          <input
            type="radio"
            name="filtro"
            value="100-300"
            checked={filtro === "100-300"}
            onChange={(e) => setFiltro(e.target.value)}
          />
          100 - 300 FR
        </label>
      </div>

      {/* Grid de productos */}
      <div className="catalogo-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="producto-card card-cmsf">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="producto-imagen"
            />
            <h3 className="producto-nombre">{producto.nombre}</h3>
            <p className="producto-costo">{producto.costo} FR</p>
            <button
              className="btn-cmsf"
              onClick={() => onCanjear(producto)}
            >
              Canjear
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatalogoProductos;

