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
      /**
       * changing to false will reset the css generated to default name but not our jsx.
       * If you change it to false then you need to update .babelrc file and set the value of
       * "generateScopedName" to "[local]"
       * **default generateScopedName value you can get from dev and prod constant file in case required
       */
      enable: true,
      format: 'cz__[hash:base64:6]',
    },
  },
};
