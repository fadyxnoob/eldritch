import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://eldritch-7jpi.vercel.app/',
  plugins: [react()],
  build: {
    sourcemap: false,
  },
})
