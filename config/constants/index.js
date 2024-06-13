const merge = require('lodash/merge');

const isProd = process.env.NODE_ENV === 'production';
const { projectName } = require('./commonConstants');

const commonConstants = {
  webpack: {
    clientConstants: {
      PROJECT_NAME: projectName,
    },
    server: {
      /*
       * assetCopyFrom: Array of String
       *  each element denotes the path of module
       *  e.g Packers-And-Movers will transform to src/containers/App/Packers-And-Movers/
       */
      assetCopyFrom: [],
      /*
       * customAssetCopy: Array of Object
       *  each element object contain two properties from and to path
       *  both path are relative to project root directory
       * {from: "src/app", to: "server-build/public/app"}
       */
      customAssetCopy: [
        {
          from: 'src/images',
          to: `${projectName}/assets`,
        },
      ],
    },
  },
  common: {
    assetProject: projectName,
  },
};

const config = isProd ? require('./constant.prod') : require('./constant.dev');

module.exports = merge(commonConstants, config);
