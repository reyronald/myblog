'use strict';

const env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (env === 'development' || emv === 'test') {
	require('babel-register');
}

exports = module.exports = require('./app');