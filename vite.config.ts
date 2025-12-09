
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Setzen Sie dies auf './' oder entfernen Sie die Zeile für lokale Tests
  base: './', 
})
