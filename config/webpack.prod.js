const path = require('path');
const { get } = require('lodash');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/* Plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

/* Constants */
const CONSTANTS = require('./constants');
const assetProject = get(CONSTANTS, 'common.assetProject');

const minifyHTML = {
  removeComments: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: `${assetProject}/[name].[contenthash].js`,
    chunkFilename: `${assetProject}/[name]/[name].[contenthash].chunk.js`,
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new LoadablePlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.js$|\.jsx$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.7,
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      inject: 'body',
      filename: 'index.html',
      minify: minifyHTML,
    }),
  ],
  performance: {
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: { ecma: 8 },
          compress: { drop_console: true, ecma: 5, warnings: false, comparisons: false, inline: 2 },
          mangle: { safari10: true },
          output: { ecma: 5, comments: false, ascii_only: true },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
});
