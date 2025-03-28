import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import externalize from 'vite-plugin-externalize-dependencies';
import { resolve } from 'path';
const externalDependencies = ["single-spa", "react", "react/jsx-dev-runtime", "react/jsx-runtime", "react-dom", "react-dom/client"]

export default defineConfig(({ command }) => {
  
  return {
    base: '/oneteam',
    server: {
      open: true,
      port: 3000,
      proxy: {
        '/api': {
          target: 'https://idev.etm.ru',
          changeOrigin: true,
        },
      },
    },
    build: {
      rollupOptions: {
        input: "src/main.ts",
        output: {
          format: "esm",
        },
        external: externalDependencies
      },
    },
    plugins: [
      react(),
      // externalize({ externals: externalDependencies })
    ],
    resolve: {
      alias: {
        '@src': resolve(__dirname, 'src'),
        '@styles': resolve(__dirname, 'src/app/styles'),
        '@app': resolve(__dirname, 'src/app'),
        '@components': resolve(__dirname, 'src/components'),
        '@shared': resolve(__dirname, 'src/shared'),
        '@features': resolve(__dirname, 'src/features'),
        '@entities': resolve(__dirname, 'src/entities'),
        '@middleware': resolve(__dirname, 'src/middleware'),
        '@store': resolve(__dirname, 'src/app/store'),
        '@utils': resolve(__dirname, 'src/utils'),
        '@views': resolve(__dirname, 'src/views'),
      },
    },
  }
})