import React from 'react';
import LoginForm from '../components/LoginForm';

function Login() {
  const handleLogin = (credentials) => {
    console.log('Credenciales enviadas:', credentials);
    // Aquí se conecta con el backend y redirige a /perfil si es correcto
    window.location.href = '/perfil';
  };

  return <LoginForm onLogin={handleLogin} />;
}

export default Login;
