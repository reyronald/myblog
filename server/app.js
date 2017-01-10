'use strict';

import express from 'express';
import http from 'http';
import config from './environment';
import mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

// MongoDb
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error : ${err}`);
  process.exit(-1); // eslint-disable-line no-process-exit
});

if (config.seedDb) {
  require('./config/seed');
}

// Setup Server
const app = express();
const server = http.createServer(app);
require('./express').default(app);
require('./routes').default(app);

// Start server
setImmediate(() => {
  app.myblog = server.listen(config.port, config.ip, () => {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
});

exports = module.expors = app;
