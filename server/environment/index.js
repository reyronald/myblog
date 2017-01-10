'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

const all = {
  env: process.env.NODE_ENV,

  root: path.normalize(path.join(__dirname, '/../../..')),

  port: process.env.PORT || 9000,

  ip: process.env.IP || '0.0.0.0',

  seedDb: false,

  mongo: {},
};

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {});
