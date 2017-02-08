import React from 'react';
import BlogPost from './BlogPost';

const BlogPosts = ({ posts }) =>
  <div>
    {posts.map(p =>
      <BlogPost key={p._id} post={p} />
    )}
  </div>
;

BlogPosts.propTypes = {
  posts: React.PropTypes.array.isRequired,
};

export default BlogPosts;
