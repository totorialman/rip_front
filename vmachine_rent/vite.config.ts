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
        "name": "VMachines",
        "short_name": "VMachines",
        "start_url": "/rip_front/",
        "display": "standalone",
        "background_color": "#fdfdfd",
        "theme_color": "#db4938",
        "orientation": "portrait-primary",
        "icons": [
          {
            "src": "/logo-512.png",
            "type": "image/png",
            "sizes": "512x512",
            "purpose": "any"
          }
        ],
      }
    })
  ],
  base: "/rip_front", 
  server: {
    host: '0.0.0.0',  
    proxy: {
      "/api": {
        target: "http://192.168.0.63:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    
  },
});
