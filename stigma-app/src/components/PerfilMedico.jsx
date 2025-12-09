import React from 'react';
import './PerfilMedico.css';
import '../assets/colores-cmsf.css';

function PerfilMedico({ medico }) {
  // medico es un objeto con los datos del perfil
  // Ejemplo:
  // {
  //   nombre: "Dr. Antonio García",
  //   especialidad: "Audiología",
  //   francoins: 240,
  //   mes: "Septiembre 2023",
  //   consultas: 52,
  //   hospitalizaciones: 16,
  //   cirugias: 8,
  //   foto: "/assets/medicos/antonio.png"
  // }

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <img
          src={medico.foto}
          alt={`Foto de ${medico.nombre}`}
          className="perfil-foto"
        />
        <div className="perfil-info">
          <h2 className="perfil-nombre">{medico.nombre}</h2>
          <p className="perfil-especialidad">{medico.especialidad}</p>
          <p className="perfil-francoins">
            Francoins: <strong>{medico.francoins} FR</strong>
          </p>
          <p><strong>Código:</strong> {medico.codigo}</p>
          <p><strong>Correo:</strong> {medico.correo}</p>
          <p><strong>Teléfono:</strong> {medico.telefono}</p>
        </div>
      </div>

      <div className="perfil-actividad card-cmsf">
        <h3 className="actividad-titulo">{medico.mes}</h3>
        <ul className="actividad-lista">
          <li>Consultas: {medico.consultas}</li>
          <li>Hospitalizaciones: {medico.hospitalizaciones}</li>
          <li>Cirugías: {medico.cirugias}</li>
        </ul>
      </div>

      <div className="perfil-actions">
        <a href="/catalogo" className="btn-cmsf">
          Ver catálogo
        </a>
      </div>
    </div>
  );
}

export default PerfilMedico;
