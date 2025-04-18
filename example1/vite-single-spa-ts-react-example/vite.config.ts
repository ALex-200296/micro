import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dynamicImport from 'vite-plugin-dynamic-import'
import depsExternal from 'rollup-plugin-node-externals';
import externalize from 'vite-plugin-externalize-dependencies'

const path = require("path");
const { parsed } = require("dotenv").config({
  path: path.resolve(__dirname, "./src/.env"),
});

export default defineConfig(({ mode }) => {
  const publicAssetsBaseUrl =
    mode === "production"
      ? parsed.VITE_MF_REACT_PROD_DOMAIN + "/"
      : "http://localhost:3002/";

  return {
    root: "./src",
    base: publicAssetsBaseUrl,
    rollupOptions: {
      input: "vite-single-spa-react.ts",
      format: "system",
      preserveEntrySignatures: true,
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      rollupOptions: {
        input: "./src/vite-single-spa-react.ts",
        preserveEntrySignatures: true,
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
    },
    plugins: [reactRefresh(), dynamicImport(),  externalize({externals: ['@org/utils']})],
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
    
  };
});