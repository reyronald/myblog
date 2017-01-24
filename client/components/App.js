import React, {PropTypes} from 'react';
import { IndexLink } from 'react-router';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1><IndexLink to="/"> My Blog </IndexLink></h1>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
