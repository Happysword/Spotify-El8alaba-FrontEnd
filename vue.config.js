const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],

  pwa: {
    icons: [
      {
        src: 'img/icons/El-8alaba.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'img/icons/El-8alaba.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    iconPaths: {
      favicon32: 'img/icons/El-8alaba.png',
      favicon16: 'img/icons/El-8alaba.png',
      appleTouchIcon: 'img/icons/El-8alaba.png',
      maskIcon: 'icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/El-8alaba.png',
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'public/firebase-messaging-sw.js',
    },
  },

  chainWebpack(config) {
    const apiClient = process.env.VUE_APP_API_CLIENT;
    config.resolve.alias.set(
      'api-client',
      path.resolve(__dirname, `src/api/${apiClient}`),
    );
  },
};
