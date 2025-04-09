const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: {
          loader: "swc-loader",
          options: {
            module: {
              type: "es6",
            },
            jsc: {
              parser: {
                syntax: "typescript",
              },
              target: "es2019",
            },
          },
        },
        exclude: function (modulePath) {
          return /(node_modules|build|dist)/.test(modulePath);
        },
      },
      {
        test: /\.svg$/,
        use: ["url-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "resolve-url-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      publicPath: "/",
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
};
