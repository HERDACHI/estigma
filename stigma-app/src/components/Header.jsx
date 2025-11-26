import React from 'react';
import '../assets/colores-cmsf.css';
import './Header.css';
//import logoCMSF from '../assets/logo-cmsf.png';

function Header() {
  return (
    <header className="header-cmsf">
      <div className="header-logo">
        <img src="/assets/logo-cmsf.png" alt="Logo CMSF" />
       {/*<img src={logoCMSF} alt="Logo CMSF" />*/}
        <h1>Centro Médico San Francisco</h1>
      </div>
      <nav className="header-nav">
        <a href="/perfil">Perfil</a>
        <a href="/catalogo">Catálogo</a>
        <a href="/login">Cerrar sesión</a>
        <a href="/auditoria">Auditoria</a>
        <a href="/usuarios">Usuarios</a>
        <a href="/productos">Productos</a>
      </nav>
    </header>
  );
}

export default Header;
