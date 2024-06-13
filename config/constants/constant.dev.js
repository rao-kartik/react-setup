const { projectName } = require('./commonConstants');

module.exports = {
  webpack: {
    clientConstants: {
      baseURL: '',
      API_BASEPATH: '',
      PUSHER_BASEPATH: 'https://www.nobroker.in/',
      ASSETS_BASEPATH: `/${projectName}/assets`,
      ORG_ASSETS_BASEPATH: 'https://assets-org.callzen.ai',
    },
    minifyCSS: {
      enable: false,
      format: '[local]__[hash:base64:6]',
    },
  },
};
