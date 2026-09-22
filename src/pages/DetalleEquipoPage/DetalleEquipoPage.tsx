// src/pages/DetalleEquipoPage/DetalleEquipoPage.tsx
import { useEffect, useState, type FormEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { equiposService, type Equipo } from '../../services/equiposService';

export default function DetalleEquipoPage() {
  const { placaSena } = useParams<{ placaSena: string }>();
  const [equipo, setEquipo] = useState<Equipo | null>(null);
  const [ram, setRam] = useState('16GB DDR4');
  const [ambiente, setAmbiente] = useState('');
  const [estado, setEstado] = useState<'Operativo' | 'En Mantenimiento'>('Operativo');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    equiposService.getAll()
     .then((data) => {
        const found = data.find((e) => e.placaSena.toUpperCase() === placaSena?.toUpperCase());
        if (found) {
          setEquipo(found);
          setRam(found.ram);
          setAmbiente(found.ambiente);
          setEstado(found.estado);
        }
      })
     .catch((err: unknown) => setError(err instanceof Error? err.message : 'Error al cargar'));
  }, [placaSena]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      await equiposService.update(placaSena!, { ram, ambiente, estado });
      navigate('/inventario');
    } catch (err: unknown) {
      setError(err instanceof Error? err.message : 'Error al actualizar');
    }
  };

  if (!equipo &&!error) {
    return (
      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '40px', textAlign: 'center', color: '#9ca3af', fontSize: '13px', maxWidth: '600px', margin: '0 auto' }}>
        Cargando recurso...
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>

      <Link to="/inventario" style={{ fontSize: '12px', fontWeight: '800', color: '#6b7280', textDecoration: 'none' }}>← Volver al Inventario</Link>

      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '20px', padding: '28px' }}>
        <h2 style={{ margin: 0, fontSize: '22px', fontWeight: '900', color: '#111827' }}>Editar Equipo (PUT)</h2>
        <p style={{ margin: '4px 0 20px 0', fontSize: '12px', color: '#9ca3af' }}>
          Placa SENA: <span style={{ color: '#111827', fontWeight: '900', background: '#f2f3f7', padding: '3px 8px', borderRadius: '6px', border: '1px solid #e5e7eb' }}>{placaSena}</span>
          {equipo && <span style={{ marginLeft: '8px', color: '#6b7280' }}>- {equipo.marcaModelo}</span>}
        </p>

        {error && <div style={{ padding: '12px', background: '#fef2f2', border: '2px solid #fecaca', borderRadius: '12px', color: '#dc2626', fontSize: '12px', fontWeight: '700', marginBottom: '16px' }}>{error}</div>}

        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#6b7280', marginBottom: '6px', letterSpacing: '0.5px' }}>MEMORIA RAM</label>
            <select value={ram} onChange={(e) => setRam(e.target.value)} style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '12px', fontSize: '13px', background: 'white', outline: 'none' }}>
              <option value="8GB DDR4">8GB DDR4</option>
              <option value="16GB DDR4">16GB DDR4</option>
              <option value="32GB DDR5">32GB DDR5</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#6b7280', marginBottom: '6px' }}>ESTADO TÉCNICO</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value as typeof estado)} style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '12px', fontSize: '13px', background: 'white', outline: 'none' }}>
              <option value="Operativo">Operativo</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: '900', color: '#6b7280', marginBottom: '6px' }}>AMBIENTE ASIGNADO</label>
            <input type="text" value={ambiente} onChange={(e) => setAmbiente(e.target.value)} style={{ width: '100%', border: '2px solid #e5e7eb', borderRadius: '10px', padding: '12px', fontSize: '13px', outline: 'none' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px', paddingTop: '10px' }}>
            <button type="button" onClick={() => navigate('/inventario')} style={{ flex: 1, background: '#f2f3f7', border: '2px solid #e5e7eb', padding: '12px', borderRadius: '12px', fontWeight: '800', fontSize: '13px', cursor: 'pointer' }}>
              Volver
            </button>
            <button type="submit" style={{ flex: 1, background: '#ff8fab', border: '2px solid #111827', padding: '12px', borderRadius: '12px', fontWeight: '900', fontSize: '13px', cursor: 'pointer' }}>
              Actualizar Recurso (PUT)
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}