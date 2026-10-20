import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Served from https://shardrop.com/privacy/ (scripts/deploy.sh puts the build there).
export default defineConfig({
  base: '/privacy/',
  plugins: [react()],
})
