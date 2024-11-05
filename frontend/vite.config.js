import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8090,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8080', // 백엔드 API 서버 주소
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ''), // 요청 경로 수정 (예: /api/user/login -> /user/login)
    //   },
    // },
  },
  optimizeDeps: {
    include: ['prettier'],
    exclude: ['node_modules/.cache'],
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
