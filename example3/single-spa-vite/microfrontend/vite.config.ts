import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import externalize from 'vite-plugin-externalize-dependencies';

const externalDependencies = ["single-spa", "react/jsx-dev-runtime", "react/jsx-runtime"]

export default defineConfig(({ command }) => {
  return {
    server: {
      open: true,
      port: 3001
    },
    build: {
      rollupOptions: {
        input: "src/main.tsx",
        output: {
          format: 'esm'
        }
        // external: externalDependencies
      },
    },
    plugins: [
      react(),
      // externalize({ externals: externalDependencies })
    ],
  }
})