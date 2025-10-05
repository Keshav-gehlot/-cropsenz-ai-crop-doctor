import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React vendor chunk
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor';
          }
          
          // Radix UI vendor chunk
          if (id.includes('@radix-ui')) {
            return 'radix-vendor';
          }
          
          // Lucide icons vendor chunk
          if (id.includes('lucide-react')) {
            return 'icons-vendor';
          }
          
          // Main UI components (large screens)
          if (id.includes('/components/DiagnosisScreen') || 
              id.includes('/components/EnhancedRemediesScreen') ||
              id.includes('/components/ProfileScreen')) {
            return 'heavy-components';
          }
          
          // Services and utilities
          if (id.includes('/services/') || id.includes('/utils/')) {
            return 'services-utils';
          }
          
          // Other components
          if (id.includes('/components/')) {
            return 'components';
          }
        }
      }
    },
    // Optimize assets
    assetsInlineLimit: 4096, // Inline assets smaller than 4kb
    // Use default minifier (esbuild) instead of terser
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'lucide-react'],
  },
})
