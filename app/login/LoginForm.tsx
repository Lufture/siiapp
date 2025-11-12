'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await loginUser(email, password);
      const token = res.message.login.token;

      if (token) {
        setToken(token);
        router.push('/dashboard');
      } else {
        setError('Error al iniciar sesión.');
      }
    } catch (err: unknown) {
    // Narrow the unknown to Error when possible
      if (err instanceof Error) {
        // Optionally surface the real error message:
        // setError(err.message);
        setError('Credenciales incorrectas o error de conexión.');
        console.error(err);
      } else {
        // Non-Error throw (e.g. string, number) — fallback generic message
        setError('Credenciales incorrectas o error de conexión.');
        console.error('Unexpected error:', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Correo electrónico</label>
        <input
          type="email"
          className="mt-1 w-full border rounded-lg p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type="password"
          className="mt-1 w-full border rounded-lg p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}
