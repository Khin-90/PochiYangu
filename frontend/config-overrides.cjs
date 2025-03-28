const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'uint8arrays': path.resolve(__dirname, 'node_modules/uint8arrays/dist/index.js'),
    'uint8arrays/util/bases': path.resolve(__dirname, 'node_modules/uint8arrays/dist/util/bases.js')
  }),
  (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'stream': require.resolve('stream-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'buffer': require.resolve('buffer/')
    };
    return config;
  }
);