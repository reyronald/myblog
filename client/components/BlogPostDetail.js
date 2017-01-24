import React from 'react';

import BlogPostFooter from './BlogPostFooter';
import BlogPostComment from './BlogPostComment';

class BlogPostDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = { post: null };
  }

  componentDidMount() {
    fetch(`/api/post/${this.props.params.id}`)
      .then(r => r.json())
      .then(post => this.setState({ post }));
  }

  render() {
    const { post } = this.state;
    if (!post) {
      return null;
    }

    return (
      <div>
        <hr />
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <BlogPostFooter post={post} />

        <h3> Comments </h3>

        {post.comments.map(comment =>
          <BlogPostComment key={comment._id} comment={comment} />
        )}

      </div>
    );
  }
}

BlogPostDetail.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default BlogPostDetail;
