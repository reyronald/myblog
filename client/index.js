import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, IndexRoute, Route } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import UserPage from './components/UserPage';
import Login from './components/Login';
import BlogPostDetail from './components/BlogPostDetail';
import NewBlogPost from './components/NewBlogPost';

render(
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={HomePage} />
      <Route path="/login" component={Login} />
      <Route path="/post" component={NewBlogPost} />
      <Route path="/post/:id/:title" component={BlogPostDetail} />
      <Route path="/:username" component={UserPage} />
    </Route>
  </Router>
, document.getElementById('app'));
