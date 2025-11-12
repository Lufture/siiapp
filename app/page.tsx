'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/auth';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-600">Cargando...</p>
    </div>
  );
}
