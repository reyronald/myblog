'use strict';

import express from 'express';
import path from 'path';
import config from './environment';

export default function(app) {
  const env = app.get('env');

  app.use(express.static(path.join(config.root, 'client')));

  /*
   * Middleware here...
   */
  require('./auth').default(app);

  // Pretty json output in developemnt mode
  if (env === 'development') {
    app.set('json spaces', 2);
  }
}
