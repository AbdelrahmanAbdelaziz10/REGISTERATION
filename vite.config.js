import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://192.168.0.180:9090',
        changeOrigin: true,
        secure: false, // Only if you're using self-signed certificates
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})