import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    padding: '7px 16px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '900' as const,
    textDecoration: 'none',
    background: isActive ? '#ff8fab' : '#f3f4f6',
    color: isActive ? 'black' : '#6b7280',
    border: `2px solid ${isActive ? '#ff8fab' : '#e5e7eb'}`,
  });

  return (
    <div style={{
      background: 'white',
      borderBottom: '2px solid #e5e7eb',
      padding: '14px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', background: '#ff8fab', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', color: 'black' }}>S</div>
        <div>
          <span style={{ color: '#111827', fontWeight: '900', fontSize: '13px', display: 'block', lineHeight: '1' }}>SENA SPACEHUBLU</span>
          <span style={{ fontSize: '9px', color: '#9ca3af', fontWeight: '700' }}>Centro de Gestión ADSO</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
        <NavLink to="/inventario" style={linkStyle}>Inventario (5)</NavLink>
        <NavLink to="/prestamos" style={linkStyle}>Préstamos (3)</NavLink>
      </div>
    </div>
  );
}