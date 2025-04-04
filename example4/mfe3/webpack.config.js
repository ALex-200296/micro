const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "org",
    projectName: "mfe3",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    devServer: {
      open: true,
      port: 8087
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
