'use strict';

import express from 'express';
import path from 'path';
import config from './environment';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default function(app) {
  const env = app.get('env');

  if (env === 'developemnt') {
    app.use(express.static(path.join(config.root, '.tmp')));
  }

  app.use(express.static(path.join(config.root, 'client')));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');

  // For logging requests
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  /*
   * Middleware here...
   */
  require('./auth').default(app);

  if (env === 'development') {
    const webpackConfig = require('../webpack.config.dev');
    const webpack = require('webpack');
    const compiler = webpack(webpackConfig);
    const webpackMiddleware = require('webpack-dev-middleware');
    const browserSync = require('browser-sync').create();

    browserSync.init({
      open: false,
      proxy: `localhost:${config.port}`,
      ws: true,
      middleware: [
        webpackMiddleware(compiler, {
          noInfo: false,
          stats: {
            colors: true,
            timings: true,
            chunks: false
          }
        })
      ],
      plugins: ['bs-fullscreen-message']
    });

    compiler.plugin('done', stats => {
      console.log('webpack done hook ==========================================================');
      if (stats.hasErrors() || stats.hasWarnings()) {
        return browserSync.sockets.emit('fullscreen:message', {
          title: 'Webpack Error:',
          body: stats.toString(),
          timeout: 100000
        });
      }
      browserSync.reload();
    });

    // Pretty json output in developemnt mode
    app.set('json spaces', 2);
  }
}
