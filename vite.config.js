import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Target modern browsers (Aruba supports them fine)
    target: 'es2015',
    // Warn if a chunk exceeds 600 kB
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Split vendor code into logical chunks for better caching
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'react-vendor'
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/@remix-run')) return 'router'
          if (id.includes('node_modules/framer-motion')) return 'motion'
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/@emailjs')) return 'emailjs'
          if (id.includes('node_modules/three')) return 'three'
          if (id.includes('node_modules/lucide-react')) return 'icons'
        },
      },
    },
    sourcemap: false,
  },
})
