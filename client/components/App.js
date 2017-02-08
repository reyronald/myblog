import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import Login from './Login';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1><IndexLink to="/"> My Blog </IndexLink></h1>

        <Login />

        <Link to="post">New post</Link>

        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
