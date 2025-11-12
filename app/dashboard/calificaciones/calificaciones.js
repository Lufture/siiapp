'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function CalificacionesPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getCalificaciones();
        if (response.flag && response.data) {
          setData(response.data);
        } else {
          setError('No se pudieron cargar las calificaciones');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar las calificaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || data.length === 0) return <ErrorMessage message="No hay calificaciones disponibles" />;

  const filterMaterias = (materias) => {
    if (!searchTerm) return materias;
    return materias.filter(m =>
      m.materia.nombre_materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.materia.clave_materia.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getCalificacionColor = (cal) => {
    if (!cal) return 'text-gray-400';
    const num = parseInt(cal);
    if (num >= 80) return 'text-green-600 font-semibold';
    if (num >= 70) return 'text-blue-600 font-semibold';
    return 'text-red-600 font-semibold';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Calificaciones</h1>
        <input
          type="text"
          placeholder="Buscar materia..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {data.map((periodo, idx) => {
        const materiasFiltered = filterMaterias(periodo.materias);
        if (materiasFiltered.length === 0) return null;

        return (
          <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">
                {periodo.periodo.descripcion_periodo}
              </h2>
              <p className="text-blue-100 text-sm">Periodo: {periodo.periodo.clave_periodo}</p>
            </div>

            <div className="p-6 space-y-4">
              {materiasFiltered.map((materia, mIdx) => {
                const calificaciones = materia.calificaiones || [];
                const promedioValido = calificaciones
                  .filter(c => c.calificacion && c.calificacion !== null)
                  .map(c => parseInt(c.calificacion));

                const promedio = promedioValido.length > 0
                  ? (promedioValido.reduce((a, b) => a + b, 0) / promedioValido.length).toFixed(1)
                  : 'N/A';

                return (
                  <div key={mIdx} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{materia.materia.nombre_materia}</h3>
                        <p className="text-sm text-gray-600">
                          {materia.materia.clave_materia} - Grupo {materia.materia.letra_grupo}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Promedio</p>
                        <p className={`text-xl font-bold ${getCalificacionColor(promedio)}`}>
                          {promedio}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {calificaciones.map((cal, cIdx) => (
                        <div key={cIdx} className="text-center p-2 bg-gray-50 rounded">
                          <p className="text-xs text-gray-600 mb-1">Parcial {cal.numero_calificacion}</p>
                          <p className={`text-lg ${getCalificacionColor(cal.calificacion)}`}>
                            {cal.calificacion || '—'}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}