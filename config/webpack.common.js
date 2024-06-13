const path = require('path');
const { get } = require('lodash');

/* Plugins */
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/* Constants */
const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const CONSTANTS = require('./constants');
const assetProject = get(CONSTANTS, 'common.assetProject');
const minifyCSSFormat = get(CONSTANTS, 'webpack.minifyCSS.format');
const assetCopyFrom = get(CONSTANTS, 'webpack.server.assetCopyFrom') || [];
const customAssetCopy = get(CONSTANTS, 'webpack.server.customAssetCopy') || [];
const envPath = path.resolve(process.cwd(), isProd ? './.env.prod' : './.env.dev');
const envVars = require('dotenv').config({ path: envPath });
const parsedEnvVars = envVars.parsed || {};
const stringifyValue = require('./utils/stringifyValue');

const cleanOptions = {
  cleanOnceBeforeBuildPatterns: ['build/*'],
};

module.exports = {
  entry: [path.join(process.cwd(), './src/index.tsx')],
  output: {
    path: path.resolve(process.cwd(), './build'),
    clean: true,
    publicPath: `/`,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(process.cwd(), './config/babel.config.js'),
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: minifyCSSFormat,
              },
              import: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          mimetype: 'image/svg+xml',
        },
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/font-woff',
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          mimetype: 'application/octet-stream',
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
      },
      // {
      //   test: /\.(jpg|png|gif|svg|webp)$/,
      //   use: [
      //     'file-loader',
      //     {
      //       loader: 'image-webpack-loader',
      //       options: {
      //         query: {
      //           gifsicle: {
      //             interlaced: true,
      //           },
      //           mozjpeg: {
      //             progressive: true,
      //           },
      //           optipng: {
      //             optimizationLevel: 7,
      //           },
      //           pngquant: {
      //             quality: '65-90',
      //             speed: 4,
      //           },
      //         },
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(cleanOptions),
    new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
    new webpack.DefinePlugin({
      'process.env': Object.assign(
        {
          NODE_ENV: JSON.stringify(NODE_ENV),
        },
        stringifyValue(parsedEnvVars),
        stringifyValue(get(CONSTANTS, ['webpack', 'clientConstants']))
      ),
    }),
    new CopyWebpackPlugin({
      patterns: [
        ...assetCopyFrom?.map((d) => ({
          from: path.resolve(process.cwd(), `./src/containers/App/${d}/images`),
          to: path.resolve(process.cwd(), `./build/${assetProject}/assets/${d}`),
        })),
        ...customAssetCopy,
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? `${assetProject}/css/[name].[contenthash].css` : `${assetProject}/css/[name].css`,
      chunkFilename: isProd ? `${assetProject}/[name]/[name].[contenthash].css` : `${assetProject}/[name]/[name].css`,
    }),
  ],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  target: 'web',
};
