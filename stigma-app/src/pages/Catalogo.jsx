import React from 'react';
import CatalogoProductos from '../components/CatalogoProductos';

function Catalogo() {
  const productosEjemplo = [
    { id: 1, nombre: 'Tensiómetro Omron', costo: 300, imagen: '/assets/productos/tensiometro.png' },
    { id: 2, nombre: 'Glucómetro Vivachek', costo: 250, imagen: '/assets/productos/glucometro.png' },
    { id: 3, nombre: 'Tensiómetro', costo: 300, imagen: '/assets/productos/tensiometro.png' },
    { id: 4, nombre: 'Glucómetro', costo: 250, imagen: '/assets/productos/glucometro.png' },
  ];

  const handleCanjear = (producto) => {
    console.log('Producto canjeado:', producto);
    // Aquí se conecta con el backend para validar saldo y registrar el canje
    window.location.href = '/canje-exitoso';
  };

  return <CatalogoProductos productos={productosEjemplo} onCanjear={handleCanjear} />;
}

export default Catalogo;
