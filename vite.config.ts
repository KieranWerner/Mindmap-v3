import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Sorgt für relative Pfade, gut für flexible Deployments
  build: {
    outDir: 'docs', // Ändert den Output-Ordner von 'dist' zu 'docs'
    emptyOutDir: true, // Leert den Ordner vor dem Bauen
  }
})
