import React from 'react';
import './CatalogoProductos.css';
import '../assets/colores-cmsf.css';

function CatalogoProductos({ productos, onCanjear }) {
  // productos es un array de objetos con la forma:
  // [
  //   { id: 1, nombre: "Tensiómetro Omron", costo: 300, imagen: "/assets/productos/tensiometro.png" },
  //   { id: 2, nombre: "Glucómetro VidaCheck", costo: 250, imagen: "/assets/productos/glucometro.png" }
  // ]

  return (
    <div className="catalogo-container">
      <h2 className="catalogo-title">Catálogo de Productos</h2>
      <div className="catalogo-grid">
        {productos.map((producto) => (
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
