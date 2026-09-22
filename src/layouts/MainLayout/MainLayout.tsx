import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../context/AuthContext';

export default function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f2f3f7', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      <NavBar />

      {/* Barra Sesion - BLANCA CON ROSADO */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e5e7eb',
        margin: '12px 24px 0 24px',
        borderRadius: '14px',
        padding: '10px 18px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ width: '8px', height: '8px', background: '#ff8fab', borderRadius: '50%', display: 'inline-block' }}></span>
          <span style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '700' }}>Sesión Activa:</span>
          <strong style={{ color: '#111827', fontSize: '13px' }}>{user?.nombreCompleto || 'Ana Maria Fajardo'}</strong>
          <span style={{ background: '#ff8fab', color: 'black', padding: '3px 10px', borderRadius: '20px', fontSize: '10px', fontWeight: '900' }}>{user?.role || 'Aprendiz'}</span>
        </div>
        <button onClick={handleLogout} style={{ background: '#f3f4f6', border: '2px solid #e5e7eb', padding: '6px 14px', borderRadius: '10px', fontWeight: '900', fontSize: '11px', cursor: 'pointer' }}>Cerrar Sesión</button>
      </div>

      <main style={{ flex: 1, padding: '20px 24px', background: '#f2f3f7' }}>
        <Outlet />
      </main>
    </div>
  );
}