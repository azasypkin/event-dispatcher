/* eslint-env node */

'use strict';

const webpack = require('webpack');

module.exports = {
  entry: './src/event-dispatcher.js',

  output: {
    filename: 'event-dispatcher.es2015.min.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],

  devtool: 'source-map'
};
