const path = require("path");
const rootPath = path.resolve(__dirname, "../");
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

const prodConfig = {
    output: {
        path: path.resolve(rootPath, 'build'),
    }
}

const merged = merge(common, prodConfig)
module.exports = function (_, _) {
  return merged;
};
