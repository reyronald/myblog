import React from 'react';
import { Link } from 'react-router';
import BlogPostFooter from './BlogPostFooter';
import { toUrlFriendly } from '../utils';

const BlogPost = ({ post }) =>
  <div>
    <hr />
    <h2><Link to={`/post/${post._id}/${toUrlFriendly(post.title)}`}>{post.title} ({post._id})</Link></h2>
    <p>{post.content}</p>

    <BlogPostFooter post={post} />
  </div>
;

BlogPost.propTypes = {
  post: React.PropTypes.object.isRequired,
};

export default BlogPost;
