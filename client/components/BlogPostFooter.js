import React from 'react';
import User from './User';

const BlogPostFooter = ({ post }) =>
  <div>
    <strong>Tags: </strong> {post.tags.map(t => <span key={t}>{t} </span>)}<br />
    <strong>Author:</strong> <User user={post.author} /> <br />
    <strong>Date:</strong> {new Date(post.createdAt).toString()}<br />
    <strong>Likes:</strong> {post.likes.length}
  </div>
;

BlogPostFooter.propTypes = {
  post: React.PropTypes.object.isRequired,
};

export default BlogPostFooter;
