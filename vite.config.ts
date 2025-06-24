import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-scroll-area'],
          'vendor-query': ['@tanstack/react-query'],
          'vendor-icons': ['lucide-react'],
          // Feature-based chunks
          'voice-accessibility': [
            './client/src/hooks/use-voice-control.tsx',
            './client/src/hooks/use-global-voice-control.tsx',
            './client/src/components/voice-control-button.tsx',
            './client/src/components/accessibility-help-modal.tsx'
          ],
          'menu-features': [
            './client/src/pages/menu.tsx',
            './client/src/components/menu-category.tsx',
            './client/src/components/accessible-menu-item.tsx'
          ],
          'basket-features': [
            './client/src/components/basket-drawer.tsx',
            './client/src/components/add-to-basket-button.tsx',
            './client/src/hooks/use-basket.tsx'
          ]
        }
      }
    }
  },
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});