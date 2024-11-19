import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      
      manifest: {
        "name": "Tile Notes",
        "short_name": "Tile Notes",
        "start_url": "/rip_front/",
        "display": "standalone",
        "background_color": "#fdfdfd",
        "theme_color": "#db4938",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "/logo-192.png",
            "type": "image/png",
            "sizes": "192x192",
            "purpose": "any"
          },
          {
            "src": "/logo-512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any"
          }
        ],
        "screenshots": [
          {
            "src": "/screenshot-desktop.png",
            "type": "image/png",
            "sizes": "1280x720",
            "form_factor": "wide"
          },
          {
            "src": "/screenshot-mobile.png",
            "type": "image/png",
            "sizes": "720x1280",
            "form_factor": "narrow"
          }
        ]
      }
    })
  ],
  base: "/rip_front", // Этот параметр сохраняет вашу базовую настройку для развертывания
  server: {
    host: '0.0.0.0',  // Слушать на всех интерфейсах
    proxy: {
      "/api": {
        target: "http://192.168.0.63:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    
  },
});
