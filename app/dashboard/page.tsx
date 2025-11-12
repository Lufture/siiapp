'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken, clearToken } from '@/lib/auth';
import { getStudentData } from '@/lib/api';
import type { Student } from '@/lib/types';
import StudentCard from './StudentCard';

export default function DashboardPage() {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getStudentData();
        setStudent(res.data);
      } catch {
        setError('Error al obtener los datos del estudiante.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = (): void => {
    clearToken();
    router.push('/login');
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Cargando datos...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700">Panel del Estudiante</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </header>

      {student && <StudentCard student={student} />}

      <section className="mt-8">
        <h2 className="text-lg font-semibold mb-2 text-gray-800">Opciones</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/grades')}
            className="bg-blue-500 text-white p-4 rounded-xl shadow hover:bg-blue-600"
          >
            Calificaciones
          </button>
          <button
            onClick={() => router.push('/dashboard/kardex')}
            className="bg-green-500 text-white p-4 rounded-xl shadow hover:bg-green-600"
          >
            Kardex
          </button>
          <button
            onClick={() => router.push('/dashboard/schedule')}
            className="bg-purple-500 text-white p-4 rounded-xl shadow hover:bg-purple-600"
          >
            Horario
          </button>
        </div>
      </section>
    </div>
  );
}
