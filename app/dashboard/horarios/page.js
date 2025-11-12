'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function HorariosPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getHorarios();
        if (response.flag && response.data) {
          setData(response.data);
        } else {
          setError('No se pudo cargar el horario');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar el horario');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data || data.length === 0) return <ErrorMessage message="No hay horarios disponibles" />;

  const dias = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const diasLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  const colors = [
    'bg-blue-100 border-blue-300 text-blue-900',
    'bg-green-100 border-green-300 text-green-900',
    'bg-purple-100 border-purple-300 text-purple-900',
    'bg-orange-100 border-orange-300 text-orange-900',
    'bg-pink-100 border-pink-300 text-pink-900',
    'bg-indigo-100 border-indigo-300 text-indigo-900',
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Horario de Clases</h1>

      {data.map((periodo, pIdx) => (
        <div key={pIdx} className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h2 className="text-lg font-semibold text-gray-900">{periodo.periodo.descripcion_periodo}</h2>
            <p className="text-sm text-gray-600">Periodo: {periodo.periodo.clave_periodo}</p>
          </div>

          {/* Vista de tabla para desktop */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase w-32">Hora</th>
                    {diasLabels.map((dia, idx) => (
                      <th key={idx} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                        {dia}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {Array.from({ length: 14 }, (_, i) => i + 7).map(hora => (
                    <tr key={hora} className="hover:bg-gray-50">
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {`${hora}:00 - ${hora + 1}:00`}
                      </td>
                      {dias.map((dia, diaIdx) => {
                        const materiasEnHora = periodo.horario.filter(h => {
                          const horario = h[dia];
                          if (!horario) return false;
                          const [inicio] = horario.split('-');
                          const horaInicio = parseInt(inicio.split(':')[0]);
                          return horaInicio === hora;
                        });

                        return (
                          <td key={diaIdx} className="px-2 py-2">
                            {materiasEnHora.map((materia, mIdx) => {
                              const colorClass = colors[periodo.horario.indexOf(materia) % colors.length];
                              const salon = materia[`${dia}_clave_salon`];

                              return (
                                <div key={mIdx} className={`p-2 rounded-lg border-2 ${colorClass} text-xs mb-1`}>
                                  <p className="font-semibold truncate">{materia.nombre_materia}</p>
                                  <p className="text-xs opacity-90">{materia[dia]}</p>
                                  {salon && <p className="text-xs font-medium mt-1">{salon}</p>}
                                </div>
                              );
                            })}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Vista de cards para móvil */}
          <div className="md:hidden space-y-4">
            {periodo.horario.map((materia, mIdx) => {
              const colorClass = colors[mIdx % colors.length];

              return (
                <div key={mIdx} className={`rounded-lg border-2 p-4 ${colorClass}`}>
                  <h3 className="font-semibold text-sm mb-2">{materia.nombre_materia}</h3>
                  <p className="text-xs mb-2">{materia.clave_materia} - Grupo {materia.letra_grupo}</p>

                  <div className="space-y-1">
                    {dias.map((dia, dIdx) => {
                      if (!materia[dia]) return null;
                      const salon = materia[`${dia}_clave_salon`];

                      return (
                        <div key={dIdx} className="flex justify-between items-center text-xs py-1 border-t border-opacity-20">
                          <span className="font-medium">{diasLabels[dIdx]}</span>
                          <span>{materia[dia]} {salon && `- ${salon}`}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Leyenda de materias */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Materias</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {periodo.horario.map((materia, mIdx) => {
                const colorClass = colors[mIdx % colors.length];
                return (
                  <div key={mIdx} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded border-2 ${colorClass}`}></div>
                    <span className="text-sm text-gray-700">
                      {materia.nombre_materia} ({materia.letra_grupo})
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}