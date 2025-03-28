const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const  { resolve } =  require('path');
const Dotenv = require('dotenv-webpack');
 
module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "org",
    projectName: "oneteam",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    plugins: [
      new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '@styles': resolve(__dirname, './src/app/styles'),
        '@app': resolve(__dirname, './src/app'),
        '@components': resolve(__dirname, './src/components'),
        '@shared': resolve(__dirname, './src/shared'),
        '@features': resolve(__dirname, './src/features'),
        '@entities': resolve(__dirname, './src/entities'),
        '@middleware': resolve(__dirname, './src/middleware'),
        '@store': resolve(__dirname, './src/app/store'),
        '@utils': resolve(__dirname, './src/utils'),
        '@views': resolve(__dirname, './src/views'),
      }
    },
    devServer:{
      open: true,
      port: 3000
    }
    // modify the webpack config however you'd like to by adding to this object
  });
};
