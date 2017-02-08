import React from 'react';
import User from './User';

const BlogPostComment = ({ comment }) =>
  <div>
    <strong><User user={comment.author} /></strong> ({new Date(comment.createdAt).toString()}) <br />

    {comment.content}
    <br />
    <br />
  </div>
;

BlogPostComment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};

export default BlogPostComment;
