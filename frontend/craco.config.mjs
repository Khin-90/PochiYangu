import { configure } from '@craco/craco';
import path from 'path';
import webpack from 'webpack';

export default configure({
  webpack: {
    alias: {
      'uint8arrays': path.resolve('node_modules/uint8arrays/dist/index.js')
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer']
      })
    ],
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      };
      return webpackConfig;
    }
  }
});