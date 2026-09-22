import { useState, type FormEvent, useEffect } from 'react';
import type { Equipo } from '../../services/equiposService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { aprendiz: string; ficha: string; equipoPlaca: string }) => Promise<void>;
  isAdmin: boolean;
  defaultNombre: string;
  defaultFicha: string;
  equipos: Equipo[];
}

export default function PrestamoModal({ isOpen, onClose, onSubmit, isAdmin, defaultNombre, defaultFicha, equipos }: Props) {
  const [equipoPlaca, setEquipoPlaca] = useState('');
  const [aprendiz, setAprendiz] = useState(defaultNombre);
  const [ficha, setFicha] = useState(defaultFicha);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setAprendiz(defaultNombre);
      setFicha(defaultFicha);
    }
  }, [isOpen, defaultNombre, defaultFicha]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ aprendiz, ficha, equipoPlaca });
      setEquipoPlaca('');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: 'white', border: '2px solid #e5e7eb', width: '100%', maxWidth: '420px', borderRadius: '20px', padding: '22px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>Registrar Nuevo Préstamo</h3>
          <button onClick={onClose} style={{ width: '28px', height: '28px', background: '#f3f4f6', border: '2px solid #e5e7eb', borderRadius: '50%', cursor: 'pointer', fontWeight: '900' }}>✕</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Seleccionar Equipo</label>
            <select required value={equipoPlaca} onChange={(e) => setEquipoPlaca(e.target.value)} style={{ width: '100%', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '10px 12px', fontSize: '13px' }}>
              <option value="">-- Selecciona un equipo --</option>
              {equipos.map((eq) => (
                <option key={eq.id} value={eq.placaSena}>{eq.placaSena} - {eq.marcaModelo}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Aprendiz</label>
            <input type="text" required value={aprendiz} onChange={(e) => setAprendiz(e.target.value)} disabled={!isAdmin} style={{ width: '100%', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '10px 12px', fontSize: '13px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '10px', fontWeight: '900', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '6px' }}>Ficha</label>
            <input type="text" required value={ficha} onChange={(e) => setFicha(e.target.value)} disabled={!isAdmin} style={{ width: '100%', background: '#f9fafb', border: '2px solid #e5e7eb', borderRadius: '12px', padding: '10px 12px', fontSize: '13px' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button type="button" onClick={onClose} style={{ padding: '10px 18px', background: '#f3f4f6', border: '2px solid #e5e7eb', borderRadius: '12px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" disabled={loading} style={{ padding: '10px 18px', background: '#ff8fab', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: '900', cursor: 'pointer' }}>{loading ? 'Guardando...' : 'Asignar Equipo'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}