const prod = require('./config/webpack.prod');
const dev = require('./config/webpack.dev');

module.exports = () => {
  const mode = process.env.NODE_ENV;

  switch (mode) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    default:
      throw new Error('No matching configuration was found!');
  }
};
