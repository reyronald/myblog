'use strict';

// import path from 'path';
import fs from 'fs';
import HttpStatus from 'http-status-codes';

export default function(app) {
  fs.readdirSync('./server/api').forEach(dir => {
    app.use(`/api/${dir}`, require(`./api/${dir}`));
  });

	// All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get((req, res) => res.status(HttpStatus.NOT_FOUND).send('404 Page not found!'));
}
