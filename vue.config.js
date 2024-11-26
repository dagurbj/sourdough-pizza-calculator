const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // Adjust if deploying to a subdirectory
  productionSourceMap: false, // Disable source maps in production
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Sourdough Pizza Calculator',
    },
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true, // Immediately activate the new service worker
      clientsClaim: true, // Ensure clients are served immediately
    },
  },
});

