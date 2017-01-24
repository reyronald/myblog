import React from 'react';
import BlogPost from './BlogPost';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    fetch('/api/post')
      .then(r => r.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div>
        {this.state.posts.map(p =>
          <BlogPost key={p._id} post={p} />
        )}
      </div>
    );
  }
}

export default HomePage;
