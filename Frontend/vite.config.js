import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  esbuild: {
    logOverride: { "react-hooks/exhaustive-deps": "silent" },
  },
  server:{
    proxy:{
      '/api' :{
          target: 'http://localhost:8000',
          changeOrigin:true
      }
    },
    host: '0.0.0.0', 
    port: 3000, 
  }
})
