const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval',
  devServer: {
    host: '0.0.0.0',
    port: '3000',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    allowedHosts: ['all'],
    static: {
      directory: path.join(__dirname, 'public')
    },
    open: false,
    hot: true,
    liveReload: true,
    historyApiFallback: true
  },
});