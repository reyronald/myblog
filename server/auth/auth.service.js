'use strict';

import config from '../environment';
import HttpStatus from 'http-status-codes';
import User from '../api/user/user.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
export function isAuthenticated() {
  return compose()
    .use((req, res, next) => {
      if (req.query && req.query.hasOwnProperty('access_token')) {
        req.headers.authorization = `Bearer ${req.query.access_token}`;
      } else if (req.cookies && req.cookies.hasOwnProperty('token') && typeof req.headers.authorization === 'undefined') {
        req.headers.authorization = `Bearer ${req.cookies.token}`;
      }
      expressJwt({ secret: config.secrets.session })(req, res, next);
    })
    // UnauthorizedError handler.
    .use(function(err, req, res, next) {
      if (err.name === 'UnauthorizedError') {
        return res.status(HttpStatus.UNAUTHORIZED).send(err.message);
      }
      next();
    })
    .use((req, res, next) => {
      User.findById(req.user._id).exec()
        .then(user => {
          if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED);
          }
          req.user = user;
          next();
        })
        .catch(err => next(err));
    });
}

/**
 * Returns a jwt token signed by the app secret
 */
export function signToken(id, role) {
  return jwt.sign({ _id: id, role }, config.secrets.session, {
    expiresIn: 60 * 60 * 5
  });
}

/**
 * Set token cookie directly for oAuth strategies
 */
export function setTokenCookie(req, res) {
  if (!req.user) {
    return res.status(HttpStatus.UNAUTHORIZED)
            .send('It looks like you aren\'t logged in, please try again.');
  }
  const token = signToken(req.user._id, req.user.role);
  res.cookie('token', token);
  res.redirect('/');
}
