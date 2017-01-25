'use strict';
/*eslint no-process-env:0*/

import path from 'path';
import _ from 'lodash';

const all = {
  env: process.env.NODE_ENV,

  root: path.normalize(path.join(__dirname, '/../../..')),

  // Browser-sync port
  browserSyncPort: process.env.BROWSER_SYNC_PORT || 3000,

  port: process.env.PORT || 9000,

  ip: process.env.IP || 'localhost',

  seedDb: false,

  mongo: {},

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'myblog'
  },
};

module.exports = _.merge(
  all,
  require(`./${process.env.NODE_ENV}.js`) || {});
