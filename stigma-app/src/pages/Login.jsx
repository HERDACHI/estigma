// src/pages/Login.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

function Login() {
  const handleLogin = async (credentials) => {
    try {
      // 1. Obtener todos los usuarios desde el backend
      const response = await fetch("http://localhost:3001/api/usuarios");
      const usuarios = await response.json();

      // 2. Buscar coincidencia
      const usuarioValido = usuarios.find(
        (u) =>
          u.usuario === credentials.usuario &&
          u.password === credentials.password
      );

      if (!usuarioValido) {
        alert("Usuario o contraseña incorrectos");
        return;
      }

      // 3. Guardar tipo y id en localStorage
      localStorage.setItem("tipoUsuario", usuarioValido.tipo);
      localStorage.setItem("idUsuario", usuarioValido.doctor_id);


      // 4. Redirigir según tipo
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
    } catch (error) {
      console.error("Error en login:", error);
      alert("Error conectando con el servidor");
    }
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default Login;
