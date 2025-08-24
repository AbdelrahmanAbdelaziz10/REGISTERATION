import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  // base: '/اسم_التطبيق/', // ضع اسم المسار الذي ستنشر تحته داخل WebSphere
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
});
