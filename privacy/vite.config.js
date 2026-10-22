import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://shardrop.com/privacy/ (scripts/deploy.sh puts the build there). The terms page is a
// second entry; deploy.sh moves it to /terms/, and its assets load from the absolute /privacy/ base.
export default defineConfig({
  base: '/privacy/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: { privacy: 'index.html', terms: 'terms/index.html' },
    },
  },
})
