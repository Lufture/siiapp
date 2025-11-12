'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import Image from 'next/image';

export default function DashboardPage() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getEstudiante();
        if (response.flag && response.data) {
          setStudentData(response.data);
        } else {
          setError('No se pudo cargar la información');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!studentData) return <ErrorMessage message="No hay datos disponibles" />;

  const stats = [
    { label: 'Semestre', value: studentData.semestre },
    { label: 'Promedio Ponderado', value: parseFloat(studentData.promedio_ponderado).toFixed(2) },
    { label: 'Promedio Aritmético', value: parseFloat(studentData.promedio_aritmetico).toFixed(2) },
    { label: 'Créditos Acumulados', value: studentData.creditos_acumulados },
  ];

  const academicInfo = [
    { label: 'Materias Cursadas', value: studentData.materias_cursadas },
    { label: 'Materias Aprobadas', value: studentData.materias_aprobadas },
    { label: 'Materias Reprobadas', value: studentData.materias_reprobadas },
    { label: 'Avance Curricular', value: `${studentData.porcentaje_avance}%` },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-start space-x-6">
          {studentData.foto && (
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                <Image
                  src={`data:image/jpeg;base64,${studentData.foto}`}
                  alt="Foto del estudiante"
                  width={96}
                  height={96}
                  className="object-cover"
                />
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{studentData.persona}</h1>
            <p className="text-gray-600 mt-1">No. Control: {studentData.numero_control}</p>
            <p className="text-gray-600">{studentData.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Académica</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {academicInfo.map((info, index) => (
            <div key={index}>
              <p className="text-sm text-gray-600 mb-1">{info.label}</p>
              <p className="text-xl font-semibold text-gray-900">{info.value}</p>
            </div>
          ))}
        </div>
      </div>

      {parseInt(studentData.materias_reprobadas) > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Atención:</span> Tienes {studentData.materias_reprobadas} materia(s) reprobada(s).
          </p>
        </div>
      )}
    </div>
  );
}