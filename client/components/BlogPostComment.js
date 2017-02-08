import React from 'react';

const BlogPostComment = ({ comment }) =>
  <div>
    <strong> {comment.author.name} </strong> ({new Date(comment.createdAt).toString()}) <br />

    {comment.content}
    <br />
    <br />
  </div>
;

BlogPostComment.propTypes = {
  comment: React.PropTypes.object.isRequired,
};

export default BlogPostComment;
