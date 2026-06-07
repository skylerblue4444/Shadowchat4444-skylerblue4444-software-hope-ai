import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    allowedHosts: true,
    hmr: { clientPort: 443 },
    proxy: {
      '/api': { target: 'http://localhost:8000', changeOrigin: true },
      '/ws':  { target: 'ws://localhost:8000',   ws: true, changeOrigin: true },
    },
  },
  preview: { host: '0.0.0.0', port: 3000 },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'web3-vendor':  ['ethers'],
        },
      },
    },
  },
});
