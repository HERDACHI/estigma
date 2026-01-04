// src/pages/Login.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

const usuarios = [
  { usuario: "admin", password: "admin", tipo: "administrador" },
  { usuario: "doctor", password: "123", tipo: "doctor" },
  { usuario: "auditor", password: "123", tipo: "auditor" },
];

function Login() {
  const handleLogin = (credentials) => {
    const usuarioValido = usuarios.find(
      (u) => u.usuario === credentials.usuario && u.password === credentials.password
    );

    if (usuarioValido) {
      // Guardar tipo en localStorage
      localStorage.setItem("tipoUsuario", usuarioValido.tipo);

      // Redirigir según tipo
      switch (usuarioValido.tipo) {
        case "administrador":
          window.location.href = "/usuarios";
          break;
        case "doctor":
          window.location.href = "/perfil";
          break;
        case "auditor":
          window.location.href = "/auditoria";
          break;
        default:
          window.location.href = "/perfil";
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default Login;

