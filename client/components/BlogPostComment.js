import React from 'react';
import { getNameFromEmail } from '../utils';

const BlogPostComment = ({ comment }) =>
  <div>
    <strong> {comment.author.name} ({getNameFromEmail(comment.author.email)}) </strong> ({new Date(comment.createdAt).toString()}) <br />

    {comment.content}
    <br />
    <br />
  </div>
;

BlogPostComment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};

export default BlogPostComment;
