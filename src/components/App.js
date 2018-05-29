// import { Link, NavLink, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch } from 'react-router-dom';
import AppHeader from './AppHeader';
import LoginPage from './Login';
import HomePage from './Home';
import AboutPage from './About';
import BlogPage from './Blog';
import NotFoundPage from './NotFound';

class App extends Component {
  render() {
    return (
      <div className="cui-main">
        <AppHeader />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
