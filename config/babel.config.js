const { get } = require('lodash');

/* Constants */
const CONSTANTS = require('./constants');
const minifyCSSFormat = get(CONSTANTS, 'webpack.minifyCSS.format');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@loadable/babel-plugin',
    '@babel/plugin-transform-runtime',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      '@dr.pogodin/react-css-modules',
      {
        generateScopedName: minifyCSSFormat,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-import-sync2', 'postcss-nested'],
          },
        },
      },
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-class-properties',
  ],
  env: {
    production: {
      plugins: [
        'lodash',
        'transform-react-remove-prop-types',
        '@babel/plugin-transform-react-constant-elements',
        ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
        'transform-remove-debugger',
      ],
    },
  },
};
