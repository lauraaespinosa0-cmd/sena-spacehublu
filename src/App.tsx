// src/App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import EquiposPage from './pages/EquiposPage/EquiposPage';
import NuevoEquipoPage from './pages/NuevoEquipoPage/NuevoEquipoPage';
import DetalleEquipoPage from './pages/DetalleEquipoPage/DetalleEquipoPage';
import LoginPage from './pages/LoginPage/LoginPage';
import PrestamosPage from './pages/PrestamosPage/PrestamosPage';
import ProtectedRoute from './routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          
          {/* LAS DOS RUTAS APUNTAN AL MISMO COMPONENTE PARA QUE NO SE VEA EN BLANCO */}
          <Route path="inventario" element={<EquiposPage />} />
          <Route path="equipos" element={<EquiposPage />} />

          <Route path="prestamos" element={<PrestamosPage />} />

          <Route element={<ProtectedRoute requiredRole="Administrador" />}>
            <Route path="inventario/nuevo" element={<NuevoEquipoPage />} />
            <Route path="inventario/:placaSena" element={<DetalleEquipoPage />} />
            {/* También para equipos */}
            <Route path="equipos/nuevo" element={<NuevoEquipoPage />} />
            <Route path="equipos/:placaSena" element={<DetalleEquipoPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}