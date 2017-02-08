import React from 'react';
import PostsPage from './PostsPage';

const UserPage = ({ params }) =>
  <PostsPage url={`api/post/username/${params.username}`}/>;

UserPage.propTypes = {
  params: React.PropTypes.shape({
    username: React.PropTypes.string.isRequired
  })
};

export default UserPage;
