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
  };

  return <PerfilMedico medico={medicoEjemplo} />;
}

export default Perfil;
