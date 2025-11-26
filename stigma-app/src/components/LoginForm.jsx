// src/components/LoginForm.jsx
import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [credentials, setCredentials] = useState({ usuario: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="login-container">
      {/* Logo CMSF */}
      <img
        src="/assets/logo-cmsf.png"
        alt="Logo CMSF"
        className="login-logo"
      />

      <h2>Acceso a Stigma</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="usuario"
          placeholder="Usuario"
          value={credentials.usuario}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default LoginForm;



/*import React, { useState } from 'react';
import './LoginForm.css'; // estilos específicos del formulario
import '../assets/colores-cmsf.css'; // paleta institucional

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí llamas al backend con los datos
    if (onLogin) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Estigma - CMSF</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            placeholder="ejemplo@cmsf.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>

        <div className="form-options">
          <a href="/recuperar" className="forgot-link">
            Olvidé mi contraseña
          </a>
        </div>

        <button type="submit" className="btn-cmsf">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default LoginForm;*/
