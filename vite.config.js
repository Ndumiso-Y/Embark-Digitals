import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],

  // Base path configuration for multi-environment support
  // - Local dev: '/'
  // - GitHub Pages: '/Embark-Digitals/'
  // - cPanel production: '/'
  base: mode === 'github-pages' ? '/Embark-Digitals/' : '/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,

    // Optimize build
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
}))
