import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
  server:{
    host: '0.0.0.0', // Allows connections from outside the local network
    port: 3000, // Port number for the development server
  }
})
