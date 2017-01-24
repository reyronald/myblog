import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import BlogPostDetail from './components/BlogPostDetail';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />
      <Route path="/post/:id" component={BlogPostDetail} />
    </Route>
  </Router>
, document.getElementById('app'));
