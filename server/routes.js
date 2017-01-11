'use strict';

// import path from 'path';
// import fs from 'fs';
import HttpStatus from 'http-status-codes';
import path from 'path';

const Promise = require('bluebird');
const readdir = Promise.promisify(require('fs').readdir);

export default function(app) {
  readdir('./server/api')
    .then(dirs => dirs.forEach(dir => app.use(`/api/${dir}`, require(`./api/${dir}`))))
    .then(() => {
      // All undefined asset or api routes should return a 404
      app.route('/:url(api|auth|components|app|bower_components|assets)/*')
        .get((req, res) => res.status(HttpStatus.NOT_FOUND).send('404 Page not found!'));

      // All other routes should redirect to the index.html
      app.route('/*')
        .get((req, res) => {
          res.sendFile(path.resolve('./client/index.html'));
        });
    });
}
