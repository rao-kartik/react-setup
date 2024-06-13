const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/* Plugins */
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 4000,
    historyApiFallback: true,
  },
  plugins: [
    new LoadablePlugin({
      writeToDisk: {
        filename: path.join(process.cwd(), './src'),
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: true,
      hash: false,
    }),
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: true, // show a error when there is a circular dependency
      cwd: process.cwd(), // set the current working directory for displaying module paths
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
});
