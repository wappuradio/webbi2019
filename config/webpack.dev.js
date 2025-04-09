const path = require("path");
const rootPath = path.resolve(__dirname, "../");
const { merge } = require('webpack-merge');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./webpack.common');

const devConfig =
{
    devServer: {
      hot: true,
      port: 3000,
      static: [
        {
          // Serve static content
          directory: path.join(rootPath, "public"),
          serveIndex: false,
        },
      ],
      historyApiFallback: {
        rewrites: [
          // Make sure we always serve index.html from root path
          {from: /^\/$/, to: '/'}
        ]
      },
    },
    plugins: [
      new ReactRefreshWebpackPlugin()
    ],
  };

const merged = merge(common, devConfig)

module.exports = function (_, _) {
  return merged;
};
