'use strict';
import Post from '../api/post/post.model';

Post.find({}).remove()
	.then(() => {
  Post.create({
    title: 'First Post',
    content: 'Hello World',
  });
});
