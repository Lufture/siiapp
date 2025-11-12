'use client';
import LoginForm from './LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          SII ITC - Inicio de sesión
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
