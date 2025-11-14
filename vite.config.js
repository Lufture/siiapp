import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    allowedHosts: ['topicosweb.celaya.tecnm.mx'],
    proxy: {
      '/api': {
        target: 'https://cetech.roque.tecnm.mx',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy) => {
          proxy.on('error', (err, req, res) => {
            console.error('proxy error', err)
          })
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log(' Enviando petición al destino:', req.method, req.url)
          })
          proxy.on('proxyRes', (proxyRes, req, res) => {
            console.log('Respuesta recibida del destino:', proxyRes.statusCode, req.url)
          })
        }
      }
    }
  }
})
