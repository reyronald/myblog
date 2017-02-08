'use strict';

import Post from '../api/post/post.model';
import User from '../api/user/user.model';
import Like from '../api/like/like.model';
import Comment from '../api/comment/comment.model';

User.findOne({ email: 'reyronald@gmail.com' })
  .then(user => {
    Post.find({}).remove()
    .then(() => {
      Post.create({
        title: 'First Post',
        content: 'Hello World',
        tags: ['hello', 'world', 'helloworld', 'first', 'genesis'],
        author: user,
        likes: [new Like({ author: user })],
        comments: [
          new Comment({ author: user, content: 'First comment! yay'}),
          new Comment({ author: user, content: 'Second comment! yay'}),
        ]
      }, {
        title: 'Second Post',
        content: 'Trying another one',
        tags: ['second'],
        author: user,
        likes: []
      });
    });
  });

User.findOne({ email: 'baramatzzu@gmail.com' })
  .then(user => {
    Post.find({}).remove()
    .then(() => {
      Post.create({
        title: 'Baramazzu Post',
        content: 'Baramazzu Post',
        tags: ['Baramazzu Post'],
        author: user,
        likes: [new Like({ author: user })],
        comments: [
        ]
      });
    });
  });
