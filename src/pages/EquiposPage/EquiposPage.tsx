// src/pages/EquiposPage/EquiposPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { equiposService, type Equipo } from '../../services/equiposService';
import { useAuth } from '../../context/AuthContext';

export default function EquiposPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busqueda, setBusqueda] = useState('');
  const { isAdmin } = useAuth();

  const loadEquipos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await equiposService.getAll();
      setEquipos(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadEquipos(); }, []);

  const handleDelete = async (placaSena: string) => {
    if (!window.confirm(`¿Eliminar el equipo ${placaSena}?`)) return;
    try {
      await equiposService.remove(placaSena);
      loadEquipos();
    } catch (err: unknown) {
      alert(`Error API: ${err instanceof Error ? err.message : 'Error al eliminar'}`);
    }
  };

  const filtrados = equipos.filter(eq =>
    (eq.placaSena + eq.marcaModelo + eq.ambiente).toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* HEADER */}
      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#111827' }}>Inventario de Equipos SENA</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>Datos obtenidos a través de la capa de servicio (equiposService.ts) - {filtrados.length} equipos</p>
        </div>
        {isAdmin && (
          <Link to="/inventario/nuevo" style={{ background: '#ff8fab', border: '2px solid #111827', padding: '10px 18px', borderRadius: '10px', fontWeight: '900', fontSize: '12px', color: 'black', textDecoration: 'none' }}>
            + Registrar Equipo (POST)
          </Link>
        )}
      </div>

      {/* BUSCADOR */}
      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '12px' }}>
        <input
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por Placa SENA, Marca/Modelo, Ambiente..."
          style={{ width: '100%', border: '2px solid #f3f4f6', background: '#f9fafb', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', outline: 'none' }}
        />
      </div>

      {error && <div style={{ padding: '12px', background: '#fef2f2', border: '2px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '12px', fontWeight: '700' }}>{error}</div>}

      {loading ? (
        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '13px' }}>Cargando inventario...</div>
      ) : (
        <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280' }}>PLACA SENA</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280' }}>MARCA/MODELO</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280' }}>RAM</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280' }}>AMBIENTE</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280' }}>ESTADO</th>
                  <th style={{ padding: '14px 16px', fontSize: '11px', fontWeight: '900', color: '#6b7280', textAlign: 'right' }}>ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {filtrados.map((eq) => (
                  <tr key={eq.placaSena} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '14px 16px', fontWeight: '800', color: '#111827' }}>{eq.placaSena}</td>
                    <td style={{ padding: '14px 16px', color: '#374151', fontWeight: '600' }}>{eq.marcaModelo}</td>
                    <td style={{ padding: '14px 16px', color: '#6b7280' }}>{eq.ram}</td>
                    <td style={{ padding: '14px 16px', color: '#6b7280' }}>{eq.ambiente}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{
                        padding: '5px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '800',
                        background: eq.estado === 'Operativo' ? '#dcfce7' : '#fef3c7',
                        color: eq.estado === 'Operativo' ? '#15803d' : '#92400e',
                        border: '1px solid #e5e7eb'
                      }}>
                        {eq.estado}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                        <Link to={`/inventario/${eq.placaSena}`} style={{ background: '#f2f3f7', border: '1px solid #e5e7eb', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', color: '#111827', textDecoration: 'none' }}>Editar</Link>
                        {isAdmin && (
                          <button onClick={() => handleDelete(eq.placaSena)} style={{ background: 'white', border: '1px solid #fecaca', color: '#ef4444', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>Eliminar</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}