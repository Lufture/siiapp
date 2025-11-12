'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';

export default function KardexPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSemestre, setFilterSemestre] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getKardex();
        if (response.flag && response.data) {
          setData(response.data);
        } else {
          setError('No se pudo cargar el kardex');
        }
      } catch (err) {
        setError(err.message || 'Error al cargar el kardex');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return <ErrorMessage message="No hay datos disponibles" />;

  const semestres = [...new Set(data.kardex.map(m => m.semestre))].sort((a, b) => a - b);

  const filteredKardex = data.kardex.filter(materia => {
    const matchSearch = !searchTerm ||
      materia.nombre_materia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      materia.clave_materia.toLowerCase().includes(searchTerm.toLowerCase());

    const matchSemestre = filterSemestre === 'all' || materia.semestre.toString() === filterSemestre;

    return matchSearch && matchSemestre;
  });

  const groupedBySemestre = filteredKardex.reduce((acc, materia) => {
    if (!acc[materia.semestre]) acc[materia.semestre] = [];
    acc[materia.semestre].push(materia);
    return acc;
  }, {});

  const getCalificacionColor = (cal) => {
    const num = parseInt(cal);
    if (num >= 80) return 'bg-green-100 text-green-800 border-green-200';
    if (num >= 70) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kardex Académico</h1>
          <p className="text-sm text-gray-600 mt-1">Avance: {data.porcentaje_avance}%</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar materia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={filterSemestre}
            onChange={(e) => setFilterSemestre(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los semestres</option>
            {semestres.map(sem => (
              <option key={sem} value={sem}>Semestre {sem}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Créditos Acumulados</p>
          <p className="text-2xl font-bold text-gray-900">{data.kardex.reduce((sum, m) => sum + parseInt(m.creditos), 0)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Materias Aprobadas</p>
          <p className="text-2xl font-bold text-green-600">
            {data.kardex.filter(m => parseInt(m.calificacion) >= 70).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-1">Materias Reprobadas</p>
          <p className="text-2xl font-bold text-red-600">
            {data.kardex.filter(m => parseInt(m.calificacion) < 70 && parseInt(m.calificacion) > 0).length}
          </p>
        </div>
      </div>

      {Object.keys(groupedBySemestre).sort((a, b) => a - b).map(semestre => (
        <div key={semestre} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Semestre {semestre}</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Clave</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Materia</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Créditos</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Calificación</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Periodo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {groupedBySemestre[semestre].map((materia, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-900">{materia.clave_materia}</td>
                    <td className="px-6 py-3 text-sm text-gray-900">{materia.nombre_materia}</td>
                    <td className="px-6 py-3 text-sm text-center text-gray-900">{materia.creditos}</td>
                    <td className="px-6 py-3 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium border ${getCalificacionColor(materia.calificacion)}`}>
                        {materia.calificacion}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-900">{materia.periodo}</td>
                    <td className="px-6 py-3 text-sm text-gray-600">{materia.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}