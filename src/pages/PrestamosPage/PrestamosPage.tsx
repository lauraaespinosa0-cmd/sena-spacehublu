import { useEffect, useState } from 'react';
import { prestamosService, type Prestamo } from '../../services/prestamosService';
import { equiposService, type Equipo } from '../../services/equiposService';
import { useAuth } from '../../context/AuthContext';
import PrestamoModal from '../../components/PrestamoModal/PrestamoModal';
import Swal from 'sweetalert2';

export default function PrestamosPage() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { isAdmin, user } = useAuth();

  const loadPrestamos = async () => {
    try {
      setLoading(true);
      setError(null);
      const [prestamosData, equiposData] = await Promise.all([
        prestamosService.getAll(),
        equiposService.getAll()
      ]);
      setPrestamos(prestamosData);
      setEquipos(equiposData);
    } catch (err: unknown) {
      setError(err instanceof Error? err.message : 'Error al cargar');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPrestamos(); }, []);

  const handleCrearPrestamo = async (data: any) => {
    try {
      await prestamosService.create(data);
      loadPrestamos();
      Swal.fire({
        title: '¡Registrado!',
        text: 'El préstamo se ha creado exitosamente.',
        icon: 'success',
        background: '#ffffff',
        color: '#111827',
        confirmButtonColor: '#ff8fab'
      });
    } catch (err) {
      Swal.fire({ title: 'Error', text: 'No se pudo registrar el préstamo', icon: 'error' });
    }
  };

  const handleDevolver = async (id: number) => {
    const result = await Swal.fire({
      title: '¿Confirmar Devolución?',
      text: "El equipo quedará nuevamente disponible.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ff8fab',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'Sí, devolver',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#111827'
    });

    if (result.isConfirmed) {
      try {
        await prestamosService.devolver(id);
        loadPrestamos();
        Swal.fire({ title: '¡Devuelto!', text: 'Equipo devuelto.', icon: 'success', confirmButtonColor: '#ff8fab' });
      } catch (err) {
        Swal.fire({ title: 'Error', text: 'No se pudo procesar', icon: 'error' });
      }
    }
  };

  return (
    <div>
      {/* ENCABEZADO ROSADO - COMO EN LA FOTO */}
      <div style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '15px', fontWeight: '900', color: '#111827', margin: 0 }}>Gestión de Solicitudes de Préstamo</h2>
          <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0 0' }}>Control de entregas y devoluciones para aprendices e instructores</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} style={{ background: '#ff8fab', border: 'none', padding: '10px 18px', borderRadius: '20px', fontWeight: '900', fontSize: '12px', cursor: 'pointer' }}>
          + Solicitar Préstamo de Equipo
        </button>
      </div>

      {error && <div style={{ background: '#fff1f2', border: '2px solid #fecdd3', color: '#be123c', padding: '10px', borderRadius: '12px', fontSize: '12px', marginBottom: '12px' }}>{error}</div>}

      {loading? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontSize: '12px' }}>Conectando con el servidor...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {prestamos.map((p) => (
            <div key={p.id} style={{ background: 'white', border: '2px solid #e5e7eb', borderRadius: '16px', padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', fontWeight: '900', color: '#ff8fab' }}>Ficha #{p.ficha}</span>
                <span style={{ fontSize: '10px', color: '#9ca3af' }}>{p.horaInicio}</span>
              </div>
              <h3 style={{ fontSize: '13px', fontWeight: '900', color: '#111827', margin: 0 }}>{p.aprendiz}</h3>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0 0 0' }}>Equipo: <b style={{ color: '#111827' }}>{p.equipoPlaca}</b></p>
              <span style={{ display: 'inline-block', marginTop: '8px', background: p.estado === 'Activo'? '#e0f2fe' : '#f3f4f6', color: p.estado === 'Activo'? '#0284c7' : '#6b7280', padding: '3px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '900' }}>{p.estado}</span>

              {p.estado === 'Activo' && (
                <button onClick={() => handleDevolver(p.id)} style={{ width: '100%', marginTop: '14px', background: '#f3f4f6', border: '2px solid #e5e7eb', borderRadius: '20px', padding: '8px', fontSize: '11px', fontWeight: '900', cursor: 'pointer' }}>
                  ✓ Registrar Devolución
                </button>
              )}
            </div>
          ))}
          {prestamos.length === 0 && <div style={{ background: 'white', border: '2px dashed #e5e7eb', borderRadius: '16px', padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>No hay préstamos registrados.</div>}
        </div>
      )}

      <PrestamoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCrearPrestamo}
        isAdmin={isAdmin}
        defaultNombre={user?.nombreCompleto || ''}
        defaultFicha={user?.ficha || ''}
        equipos={equipos}
      />
    </div>
  );
}