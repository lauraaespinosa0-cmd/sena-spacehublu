// src/pages/DashboardPage.tsx
export default function DashboardPage() {
  return (
    <div style={{ padding: '32px 24px', background: '#0a0a0a', minHeight: 'calc(100vh - 70px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '900', margin: 0 }}>Panel principal</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '6px' }}>Consulta y administra el inventario de equipos SENA desde el menú superior.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'white', border: '3px solid #1a1a1a', borderRadius: '20px', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: '#ff8fab', letterSpacing: '1px', margin: 0 }}>TOTAL EQUIPOS</p>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a0a0a', margin: '8px 0 0 0' }}>124</h2>
            <p style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Disponibles en laboratorio</p>
          </div>
          <div style={{ background: '#ff8fab', border: '3px solid #1a1a1a', borderRadius: '20px', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: '#0a0a0a', letterSpacing: '1px', margin: 0 }}>PRÉSTAMOS ACTIVOS</p>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0a0a0a', margin: '8px 0 0 0' }}>8</h2>
            <p style={{ fontSize: '11px', color: '#4a1a22', marginTop: '4px' }}>En uso actualmente</p>
          </div>
          <div style={{ background: '#1a1a1a', border: '3px solid #2a2a2a', borderRadius: '20px', padding: '20px' }}>
            <p style={{ fontSize: '11px', fontWeight: '800', color: '#888', letterSpacing: '1px', margin: 0 }}>USUARIOS</p>
            <h2 style={{ fontSize: '28px', fontWeight: '900', color: 'white', margin: '8px 0 0 0' }}>56</h2>
            <p style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>Aprendices registrados</p>
          </div>
        </div>

        <div style={{ marginTop: '20px', background: 'white', border: '3px solid #1a1a1a', borderRadius: '20px', padding: '24px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '900', color: '#0a0a0a', margin: '0 0 16px 0' }}>Acceso rápido</h3>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: '#0a0a0a', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '12px' }}>+ Nuevo Préstamo</button>
            <button style={{ background: '#fff0f3', color: '#0a0a0a', border: '2px solid #1a1a1a', padding: '12px 20px', borderRadius: '12px', fontWeight: '800', fontSize: '12px' }}>Ver Inventario</button>
          </div>
        </div>

      </div>
    </div>
  );
}