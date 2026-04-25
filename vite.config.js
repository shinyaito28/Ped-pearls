import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// `base` defaults to '/' so Vercel root deploys work out of the box.
// GitHub Actions overrides it via `vite build --base=/Ped-pearls/` for the
// GitHub Pages sub-path deploy. See .github/workflows/deploy.yml.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Pediatric Anesthesia Pearls',
        short_name: 'PedPearls',
        description: 'Pediatric Anesthesia Reference & Calculator',
        theme_color: '#0d9488',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
