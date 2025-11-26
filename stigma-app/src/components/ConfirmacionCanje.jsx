import React from 'react';
import './ConfirmacionCanje.css';
import '../assets/colores-cmsf.css';

function ConfirmacionCanje({ saldo }) {
  // saldo: número de Francoins restantes después del canje

  return (
    <div className="canje-container">
      <div className="canje-card card-cmsf">
        <h2 className="canje-titulo">✅ Canje realizado con éxito</h2>
        <p className="canje-saldo">
          Saldo actualizado: <strong>{saldo} FR</strong>
        </p>
        <a href="/catalogo" className="btn-cmsf">
          Volver al catálogo
        </a>
      </div>
    </div>
  );
}

export default ConfirmacionCanje;
