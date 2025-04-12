import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig(async ({ mode, command }) => {
  const viteTsconfigPaths = await import('vite-tsconfig-paths')
  const env = await loadEnv(mode, process.cwd())
  
  return {
    server: {
      port: 4101,
      hmr: env.VITE_APP_HMR === 'true'
    },
    plugins: [
      react(),
      vitePluginSingleSpa({
        type: 'mife',
        spaEntryPoints: '/src/spa.tsx',
      }),
      viteTsconfigPaths.default(),
    ],
    build: {
      outDir: 'v2',
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name].[hash].js',
          chunkFileNames: 'static/js/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name.endsWith('.css')) {
              return 'static/css/[name].[hash].[ext]';
            }
            return 'static/[name].[hash].[ext]';
          },
        },
      },
    },
  }
});

