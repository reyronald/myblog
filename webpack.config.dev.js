/*eslint-env node*/
'use strict';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';

exports = module.exports = {
  entry: {
    app: './client/app/app.js'
  },
  output: {
    // path: path.join(__dirname, '/dist/client/'),
    path: path.join(__dirname, '/.tmp/'),
    publicPath: '/',
    filename: '[name].bundle.js',
  },
  devtool: 'source-map',

  module: {
    preLoaders: [
    ],
    loaders: [
      {
        // JS LOADER
        // Reference: https://github.com/babel/babel-loader
        // Transpile .js files using babel-loader
        // Compiles ES6 and ES7 into ES5 code
        test: /\.js$/,
        loaders: ['babel', 'eslint'],
        include: [
          path.resolve(__dirname, 'client/'),
          path.resolve(__dirname, 'node_modules/lodash-es/')
        ],
        exclude: /node_modules/
      },
      {
        // ASSET LOADER
        // Reference: https://github.com/webpack/file-loader
        // Copy png, jpg, jpeg, gif, svg, woff, woff2, ttf, eot files to output
        // Rename the file using the asset hash
        // Pass along the updated reference to your code
        // You can add here any file extension you want to get copied to your output
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)([?]?.*)$/,
        loader: 'file'
      }, {
        // HTML LOADER
        // Reference: https://github.com/webpack/raw-loader
        // Allow loading html through js
        test: /\.html$/,
        loader: 'raw'
      }, {
        // LESS LOADER
        // Reference: https://github.com/
        test: /\.less$/,
        loaders: ['style', 'css', 'less'],
        include: [
          path.resolve(__dirname, 'node_modules/bootstrap/less/*.less'),
          path.resolve(__dirname, 'client/app/app.less')
        ]
      }]
  },

  eslint: {
    failOnWarning: true,
    failOnError: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/_index.html',
      filename: '../client/index.html',
      alwaysWriteToDisk: true
    }),
    new HtmlWebpackHarddiskPlugin(),
    // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    // Define free global variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],

  devServer: {
    contentBase: './client/',
    stats: {
      modules: false,
      cached: false,
      colors: true,
      chunk: false
    }
  },

  node: {
    global: 'window',
    process: true,
    crypto: 'empty',
    clearImmediate: false,
    setImmediate: false
  },

};
