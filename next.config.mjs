/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // cuando llames a /api-sii/login desde el frontend
        source: '/api-sii/:path*',
        destination: 'https://cetech.roque.tecnm.mx/api/:path*', // tu API real
      },
    ];
  },
};

export default nextConfig;
