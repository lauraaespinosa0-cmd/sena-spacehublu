// src/pages/LoginPage/LoginPage.tsx
import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Correo o contraseña incorrectos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0a0a',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#ffffff',
        borderRadius: '28px',
        padding: '36px 32px',
        border: '3px solid #1a1a1a'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px', height: '64px', margin: '0 auto',
            background: '#1a1a1a',
            borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '900', color: '#ff8fab'
          }}>S</div>
          <h1 style={{ marginTop: '14px', fontSize: '22px', fontWeight: '900', color: '#1a1a1a' }}>SENA SPACEHUB</h1>
        </div>

        {error && (
          <div style={{ background: '#ffe5ec', color: '#c9184a', padding: '10px', borderRadius: '12px', fontSize: '12px', marginBottom: '16px', textAlign: 'center', fontWeight: '700' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '10px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '1px' }}>CORREO INSTITUCIONAL</label>
            <input
              type="email" required
              value={email} onChange={e=>setEmail(e.target.value)}
              placeholder="tu correo @sena.edu.co"
              style={{
                marginTop: '6px', width: '100%', padding: '14px 16px',
                borderRadius: '14px', border: '2px solid #1a1a1a',
                background: '#fff0f3', color: '#1a1a1a', outline: 'none', fontSize: '14px', boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '10px', fontWeight: '800', color: '#1a1a1a', letterSpacing: '1px' }}>CONTRASEÑA</label>
            <input
              type="password" required
              value={password} onChange={e=>setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                marginTop: '6px', width: '100%', padding: '14px 16px',
                borderRadius: '14px', border: '2px solid #1a1a1a',
                background: '#fff0f3', color: '#1a1a1a', outline: 'none', fontSize: '14px', boxSizing: 'border-box'
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            marginTop: '8px', width: '100%', padding: '15px',
            borderRadius: '14px', border: '2px solid #1a1a1a',
            background: loading ? '#cccccc' : '#ff8fab',
            color: '#1a1a1a', fontWeight: '900', fontSize: '14px', cursor: 'pointer'
          }}>
            {loading ? 'Entrando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
}