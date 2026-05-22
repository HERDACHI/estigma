import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

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
import RankingDoctores from "./pages/RankingDoctores";
import EditarUsuario from "./pages/EditarUsuario";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">

        {/* Ocultar Header y Footer en /login */}
        {window.location.pathname !== "/login" && <Header />}

        <main className="app-main">
          <Routes>

            {/* Ruta por defecto */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* RUTA PÚBLICA */}
            <Route path="/login" element={<Login />} />

            {/* RUTAS PRIVADAS */}
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />

            <Route
              path="/catalogo"
              element={
                <ProtectedRoute>
                  <Catalogo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/canje-exitoso"
              element={
                <ProtectedRoute>
                  <CanjeExitoso />
                </ProtectedRoute>
              }
            />

            <Route
              path="/auditoria"
              element={
                <ProtectedRoute>
                  <Auditoria />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productos"
              element={
                <ProtectedRoute>
                  <Productos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productos/crear"
              element={
                <ProtectedRoute>
                  <CrearProducto />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productos/editar/:id"
              element={
                <ProtectedRoute>
                  <EditarProducto />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gestion-francois/:id"
              element={
                <ProtectedRoute>
                  <GestionFrancois />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gestion-servicios/:id"
              element={
                <ProtectedRoute>
                  <GestionServicios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/usuarios"
              element={
                <ProtectedRoute>
                  <GestionUsuarios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/crear-usuario"
              element={
                <ProtectedRoute>
                  <CrearUsuario />
                </ProtectedRoute>
              }
            />

            <Route
              path="/gestion-usuarios"
              element={
                <ProtectedRoute>
                  <GestionUsuarios />
                </ProtectedRoute>
              }
            />

            <Route
              path="/carga-masiva"
              element={
                <ProtectedRoute>
                  <CargaMasiva />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ranking-doctores"
              element={
                <ProtectedRoute>
                  <RankingDoctores />
                </ProtectedRoute>
              }
            />

            <Route
              path="/editar-usuario/:id"
              element={
                <ProtectedRoute>
                  <EditarUsuario />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>

        {window.location.pathname !== "/login" && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;



