'use client';
import type { Student } from '@/lib/types';

interface StudentProps {
  student: Student;
}

export default function StudentCard({ student }: StudentProps) {
  const {
    persona,
    numero_control,
    email,
    semestre,
    creditos_acumulados,
    promedio_ponderado,
    porcentaje_avance,
    foto,
  } = student;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col sm:flex-row items-center gap-6">
      {foto ? (
        <img
          src={`data:image/jpeg;base64,${foto}`}
          alt="Foto del estudiante"
          className="w-28 h-28 rounded-full object-cover border-2 border-blue-500"
        />
      ) : (
        <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          Sin foto
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{persona}</h2>
        <p className="text-gray-600 text-sm">
          <strong>No. Control:</strong> {numero_control}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Email:</strong> {email}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Semestre:</strong> {semestre}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Créditos:</strong> {creditos_acumulados}
        </p>
        <p className="text-gray-600 text-sm">
          <strong>Promedio:</strong> {promedio_ponderado}
        </p>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{ width: `${porcentaje_avance}%` }}
          />
        </div>
        <p className="text-sm text-gray-500">{porcentaje_avance}% de avance</p>
      </div>
    </div>
  );
}
