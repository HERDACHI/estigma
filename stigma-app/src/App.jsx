import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Perfil from './pages/Perfil';
import Catalogo from './pages/Catalogo';
import CanjeExitoso from './pages/CanjeExitoso';
import Auditoria from './pages/Auditoria';
import Productos from './pages/Productos';
import Header from './components/Header';
import Footer from './components/Footer';
import CrearProducto from './pages/CrearProducto';
import GestionFrancois from './pages/GestionFrancois';
import GestionServicios from './pages/GestionServicios';
import EditarProducto from './pages/EditarProducto';
import GestionUsuarios from './pages/GestionUsuarios';
import CrearUsuario from './pages/CrearUsuario';
import CargaMasiva from './pages/CargaMasiva';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <main className="app-main">
          <Routes>
            {/* Ruta por defecto redirige a login */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/canje-exitoso" element={<CanjeExitoso />} />
            <Route path="/auditoria" element={<Auditoria />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/crear" element={<CrearProducto />} />
            <Route path="/productos/editar/:id" element={<EditarProducto />} />
            <Route path="/gestion-francois/:id" element={<GestionFrancois />} />
            <Route path="/gestion-servicios/:id" element={<GestionServicios />} />
            <Route path="/usuarios" element={<GestionUsuarios />} />
            <Route path="/crear-usuario" element={<CrearUsuario />} /> 
            <Route path="/gestion-usuarios" element={<GestionUsuarios />} />      
            <Route path="/carga-masiva" element={<CargaMasiva />} />       

          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;








