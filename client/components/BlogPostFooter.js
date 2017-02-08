import React from 'react';
import { getNameFromEmail } from '../utils';
import { Link } from 'react-router';

const BlogPostFooter = ({ post }) => {
  const username = getNameFromEmail(post.author.email);
  return (
    <div>
      <strong>Tags: </strong> {post.tags.map(t => <span key={t}>{t} </span>)}<br />
      <strong>Author:</strong> {post.author.name} (<Link to={`/${username}`}>{username}</Link>)<br />
      <strong>Date:</strong> {new Date(post.createdAt).toString()}<br />
      <strong>Likes:</strong> {post.likes.length}
    </div>
  );
};

BlogPostFooter.propTypes = {
  post: React.PropTypes.object.isRequired,
};

export default BlogPostFooter;
