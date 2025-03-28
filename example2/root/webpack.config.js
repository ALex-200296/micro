import { merge } from 'webpack-merge';
import singleSpaDefaults from 'webpack-config-single-spa-ts';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const orgName = "org";

const config = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });
};

export default config;