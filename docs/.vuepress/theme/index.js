const path = require('path')

module.exports = {
  extend: '@vuepress/theme-default',
  name: 'vuepress-theme-local',
  // devTemplate: path.resolve(__dirname, 'templates/index.dev.html'),
  // ssrTemplate: path.resolve(__dirname, 'templates/index.dev.html'),
  globalLayout: path.resolve(__dirname, 'layouts/Layout.vue'),
};
