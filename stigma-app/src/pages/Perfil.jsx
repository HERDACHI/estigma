
import React, { useEffect, useState } from "react";
import PerfilMedico from "../components/PerfilMedico";

function Perfil() {
  const [medico, setMedico] = useState(null);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const id = localStorage.getItem("idUsuario");

        if (!id) {
          alert("No se encontró el usuario logueado");
          return;
        }

        const response = await fetch(`http://localhost:3001/api/doctores/${id}`);
        const data = await response.json();

        setMedico(data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        alert("Error obteniendo datos del servidor");
      }
    };

    cargarPerfil();
  }, []);

  if (!medico) {
    return <p>Cargando perfil...</p>;
  }

  return <PerfilMedico medico={medico} />;
}

export default Perfil;

/*
import React from 'react';
import PerfilMedico from '../components/PerfilMedico';

function Perfil() {
  const medicoEjemplo = {
    nombre: 'Dr. Antonio García',
    especialidad: 'Audiología',
    francoins: 240,
    mes: 'Septiembre 2023',
    consultas: 52,
    hospitalizaciones: 16,
    cirugias: 8,
    foto: '/assets/medicos/antonio.png',
    codigo: 'V12345678',
    correo: 'medico1@correo.com',
    telefono: '0414-1332112',
  };

  return <PerfilMedico medico={medicoEjemplo} />;
}

export default Perfil;  */