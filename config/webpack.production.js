const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require('webpack-merge');

const rootPath = path.resolve(__dirname, "../");
const common = require('./webpack.common');

const prodConfig = {
    output: {
        assetModuleFilename: 'assets/[name]-[hash][ext]',
        clean: true,
        filename: 'assets/[name]-[contenthash].js',
        path: path.resolve(rootPath, 'build'),
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/[name]-[contenthash].css',
        }),
    ],
}

const merged = merge(common, prodConfig)
module.exports = function (_, _) {
  return merged;
};
