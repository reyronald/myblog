'use strict';

import Post from '../api/post/post.model';
import User from '../api/user/user.model';
import Like from '../api/like/like.model';

User.findOne({ email: 'reyronald@gmail.com' })
  .then(user => {
    Post.find({}).remove()
    .then(() => {
      Post.create({
        title: 'First Post',
        content: 'Hello World',
        tags: ['hello', 'world', 'helloworld', 'first', 'genesis'],
        author: user,
        likes: [new Like({ author: user })]
      });
    });
  });
