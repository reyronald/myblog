'use strict';

import HttpStatus from 'http-status-codes';
import Post from './post.model';
import User from '../user/user.model';
import jsonpatch from 'fast-json-patch';
import express from 'express';
import { isAuthenticated } from '../../auth/auth.service';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;
const router = express.Router();

function ok(res, entity, statusCode) {
  return entity ? res.status(statusCode).json(entity) : null;
}

function handleIfNotFound(res) {
  return function(entity) {
    if (!entity) {
      return res.status(HttpStatus.NOT_FOUND).end();
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  return err => res.status(statusCode).send(err);
}

function populatePostWithAuthor(post) {
  return post.populate('author', 'name email -_id');
}

function populatePostWtithComments(post) {
  return populatePostWithAuthor(post)
    .populate('comments.author', 'name email -_id');
}

router.get('/', (req, res) => populatePostWithAuthor(Post.find())
  .sort({createdAt: 'desc'})
  .exec()
  .then(entity => ok(res, entity, HttpStatus.OK))
  .catch(handleError(res)));

router.get('/username/:username', (req, res) => {
  User.findOne({ email: `${req.params.username}@gmail.com`})
    .select('_id')
    .exec()
    .then(user => populatePostWithAuthor(Post.find({ author: ObjectId(user._id) }))
        .sort({createdAt: 'desc'})
        .exec()
        .then(entity => ok(res, entity, HttpStatus.OK))
        .catch(handleError(res)));
});

router.get('/:id', (req, res) => populatePostWtithComments(Post.findById(req.params.id))
  .exec()
  .then(handleIfNotFound(res))
  .then(entity => ok(res, entity, HttpStatus.OK))
  .catch(handleError(res)));

router.post('/', isAuthenticated(), (req, res) => Post.create({...req.body, author: ObjectId(req.user._id) })
  .then(entity => ok(res, entity, HttpStatus.CREATED))
  .catch(handleError(res)));

router.post('/:id/comment', isAuthenticated(), (req, res) => {
  const comment = {...req.body, author: ObjectId(req.user._id)};
  const post = Post.findByIdAndUpdate(req.params.id,
    { $push: { comments: comment } },
    { safe: true, upsert: true, new: true});

  populatePostWtithComments(post).exec()
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
