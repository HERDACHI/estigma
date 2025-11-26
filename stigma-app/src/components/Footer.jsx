import React from 'react';
import '../assets/colores-cmsf.css';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-cmsf">
      <p>© {new Date().getFullYear()} Centro Médico San Francisco - Todos los derechos reservados</p>
    </footer>
  );
}

export default Footer;
