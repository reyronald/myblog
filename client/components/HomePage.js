import React from 'react';
import BlogPost from './BlogPost';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    const { username } = this.props.params;
    const url = !username ? 'api/post' : `api/post/username/${username}`;

    fetch(url)
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

HomePage.propTypes = {
  params: React.PropTypes.object.isRequired,
};


export default HomePage;
