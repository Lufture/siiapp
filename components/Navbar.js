'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { removeToken } from '@/lib/auth';

export default function Navbar({ studentData }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.push('/login');
  };

  const navItems = [
    { name: 'Información', path: '/dashboard' },
    { name: 'Calificaciones', path: '/dashboard/calificaciones' },
    { name: 'Kardex', path: '/dashboard/kardex' },
    { name: 'Horarios', path: '/dashboard/horarios' },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">TECNM Celaya</h1>
            </div>
            <div className="hidden md:flex md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {studentData && (
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-gray-900">{studentData.persona}</p>
                <p className="text-xs text-gray-500">{studentData.numero_control}</p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden border-t border-gray-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                pathname === item.path
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}