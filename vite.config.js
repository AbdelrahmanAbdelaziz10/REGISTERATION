import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Define your custom hostname
const customHost = 'servesrequest';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 3000,
    strictPort: true,
    allowedHosts: [
      customHost,        // Your custom hostname
      'dash.maxcafm.com', // Your custom domain
      'localhost',       // Local development
      '127.0.0.1',       // Localhost IP
    ],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});