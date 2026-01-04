// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/colores-cmsf.css";
import "./Header.css";

function Header() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  // Recuperar tipo de usuario
  const tipoUsuario = localStorage.getItem("tipoUsuario");

  return (
    <header className="header-cmsf">
      <div className="header-logo">
        <img src="/assets/logo-cmsf.png" alt="Logo CMSF" />
        <h1>Centro Médico San Francisco</h1>
      </div>

      {!isLoginPage && (
        <nav className="header-nav">
          {tipoUsuario === "doctor" ? (
            <>
              <a href="/perfil">Perfil</a>
              <a href="/catalogo">Catálogo</a>
              <a href="/login">Cerrar  </a>
            </>
          ) : (
            <>
              <a href="/perfil">Perfil</a>
              <a href="/catalogo">Catálogo</a>              
              <a href="/auditoria">Auditoria</a>
              <a href="/usuarios">Usuarios</a>
              <a href="/productos">Productos</a>
              <a href="/login">Cerrar sesión</a>
            </>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header;

