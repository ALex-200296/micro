const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const path = require('path');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "org",
    projectName: "mfe3",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    devServer:{
      open: true,
      port: 3002
    },
      output: {
          filename: 'main.js',
          path: path.resolve(__dirname, 'v2'),
             chunkFilename: 'static/js/[name].[contenthash].js'
        },
    // modify the webpack config however you'd like to by adding to this object
  });
};
