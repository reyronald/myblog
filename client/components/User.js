import React from 'react';
import { Link } from 'react-router';
import { getNameFromEmail } from '../utils';

const User = ({ user }) => {
  const username = getNameFromEmail(user.email);
  return <span>{user.name} (<Link to={`/${username}`}>{username}</Link>)</span>;
};

User.propTypes = {
  user: React.PropTypes.shape({
    email: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  })
};

export default User;
