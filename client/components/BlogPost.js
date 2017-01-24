import React from 'react';

const BlogPost = ({ post }) =>
  <div>
    <hr />
    <h2>{post.title}</h2>
    <p>{post.content}</p>

    <div>
      <strong>Author:</strong> {post.author.name}<br />
      <strong>Date:</strong> {new Date(post.createdAt).toString()}<br />
      <strong>Likes:</strong> {post.likes.length}
    </div>
  </div>
;

BlogPost.propTypes = {
  post: React.PropTypes.object.isRequired,
};

export default BlogPost;
