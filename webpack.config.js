/* eslint-env node */

'use strict';

module.exports = {
  entry: './src/event-dispatcher.js',

  output: {
    filename: 'event-dispatcher.es2015.js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  devtool: 'source-map'
};
