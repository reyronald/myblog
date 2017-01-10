'use strict';

import HttpStatus from 'http-status-codes';
import Post from './post.model';
import jsonpatch from 'fast-json-patch';

const router = require('express').Router();

function ok(res, entity, statusCode) {
	if (!!entity) {
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
	return function(err) {
		res.status(statusCode).send(err);
	};
}

router.get('/', (req, res) => {
	return Post.find().exec()
		.then(entity => ok(res, entity, HttpStatus.OK))
		.catch(handleError(res));
});

router.get('/:id', (req, res) => {
	return Post.findById(req.params.id).exec()
		.then(handleIfNotFound(res))
		.then(entity => ok(res, entity, HttpStatus.OK))
		.catch(handleError(res));
});

router.post('/', (req, res) => {
	return Post.create(req.body)
		.then(entity => ok(res, entity, HttpStatus.CREATED))
		.catch(handleError(res));
});

router.put('/:id', (req, res) => {
	if (!!req.body._id) {
		delete req.body._id;
	}
	return Post.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
		.then(entity => ok(res, entity, HttpStatus.OK))
		.catch(handleError(res));
});

router.patch('/:id', (req, res) => {
	if (!!req.body._id) {
		delete req.body._id;
	}
	return Post.findById(req.params.id).exec()
		.then(handleIfNotFound(res))
		.then(entity => {
			try	{
				jsonpatch.apply(entity, req.body, true);
			} catch(err) {
				return Promise.reject(err);
			}

			return entity.save();
		})
		.then(entity => ok(res, entity, HttpStatus.OK))
		.catch(handleError(res));
});

module.exports = router;
