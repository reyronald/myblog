'use strict';

import HttpStatus from 'http-status-codes';
import Post from './post.model';
import jsonpatch from 'fast-json-patch';
import express from 'express';
import { isAuthenticated } from '../../auth/auth.service';
import mongoose from 'mongoose';

const router = express.Router();

function ok(res, entity, statusCode) {
  if (entity) {
    return res.status(statusCode).json(entity);
  }
  return null;
}

function handleIfNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(HttpStatus.NOT_FOUND).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  return err => res.status(statusCode).send(err);
}

function populatePost(post) {
  return post.populate('author', 'name -_id')
    .populate('comments.author', 'name -_id');
}

router.get('/', (req, res) => Post.find()
  .sort({createdAt: 'desc'})
  .populate('author', 'name -_id')
  .exec()
  .then(entity => ok(res, entity, HttpStatus.OK))
  .catch(handleError(res)));

router.get('/:id', (req, res) => populatePost(Post.findById(req.params.id))
  .exec()
  .then(handleIfNotFound(res))
  .then(entity => ok(res, entity, HttpStatus.OK))
  .catch(handleError(res)));

router.post('/', (req, res) => Post.create(req.body)
  .then(entity => ok(res, entity, HttpStatus.CREATED))
  .catch(handleError(res)));

router.post('/:id/comment', isAuthenticated(), (req, res) => {
  const comment = {...req.body, author: mongoose.Types.ObjectId(req.user._id)};
  const post = Post.findByIdAndUpdate(req.params.id,
    { $push: { comments: comment } },
    { safe: true, upsert: true, new: true});

  populatePost(post).exec()
    .then(handleIfNotFound(res))
    .then(entity => ok(res, entity, HttpStatus.OK))
    .catch(handleError(res));
});

router.put('/:id', (req, res) => {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Post.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()
    .then(entity => ok(res, entity, HttpStatus.OK))
    .catch(handleError(res));
});

router.patch('/:id', (req, res) => {
  if (req.body._id) {
    Reflect.deleteProperty(req.body, '_id');
  }
  return Post.findById(req.params.id).exec()
    .then(handleIfNotFound(res))
    .then(entity => {
      try {
        Reflect.apply(jsonpatch, req.body, true);
      } catch(err) {
        return Promise.reject(err);
      }

      return entity.save();
    })
    .then(entity => ok(res, entity, HttpStatus.OK))
    .catch(handleError(res));
});

exports = module.exports = router;
