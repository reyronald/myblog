import React from 'react';
import BlogPosts from './BlogPosts';

class PostsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    fetch(this.props.url)
      .then(r => r.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <BlogPosts posts={this.state.posts} />
    );
  }
}

PostsPage.propTypes = {
  url: React.PropTypes.string.isRequired,
};

export default PostsPage;
