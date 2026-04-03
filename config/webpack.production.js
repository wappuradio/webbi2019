const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');

const rootPath = path.resolve(__dirname, "../");
const common = require('./webpack.common');

const prodConfig = {
    output: {
        path: path.resolve(rootPath, 'build'),
    },
    plugins: [
        new MiniCssExtractPlugin(),
    ],
}

const merged = merge(common, prodConfig)
module.exports = function (_, _) {
  return merged;
};
