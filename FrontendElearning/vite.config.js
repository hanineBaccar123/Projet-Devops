import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/cours': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/commentaire': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/p': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
      '/images': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
})
