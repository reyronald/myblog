'use strict';

import { Router } from 'express';
import { isAuthenticated } from '../../auth/auth.service';
import User from './user.model';
import HttpStatus from 'http-status-codes';

const router = new Router();

router.get('/me', isAuthenticated(), (req, res, next) => User.findById(req.user._id, '-salt -password')
    .exec()
    .then(user => {
      if (!user) {
        return res.status(HttpStatus.FORBIDDEN).end();
      }
      res.json(user);
    })
    .catch(err => next(err))
);

exports = module.exports = router;
