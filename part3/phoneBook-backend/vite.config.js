import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// export default {
//   plugins: [react()],
//   server: {
//     port: 3001 // Set the development server to run on localhost:3001
//   }
// }

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    }
  },
})