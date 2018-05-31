import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  List,
  ListItem,
  Topbar,
  TopbarNav,
  TopbarMobile,
  TopbarRight,
  // Popover,
  Button
} from '@collab-ui/react';
import * as actions from '../Login/actions';

class AppHeader extends Component {
  logoutUser = () => {
    console.log('log out user'); // eslint-disable-line no-console
    this.props.actions.logoutUser();
  };

  render() {
    const logoIcon = <i className="icon icon-cisco-logo" />;
    const getAvatar = () => {
      const number = Math.floor(Math.random() * 101);
      const gender = Math.random() >= 0.5 ? 'women' : 'men';
      return `https://randomuser.me/api/portraits/${gender}/${number}.jpg`;
    };
    const navItems = (
      <Fragment>
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink exact to="/" activeClassName={'active'}>
              Home
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/about" activeClassName={'active'}>
              About
            </NavLink>
          }
        />
        <ListItem
          customRefProp="innerRef"
          customAnchorNode={
            <NavLink to="/blog" activeClassName={'active'}>
              Blog
            </NavLink>
          }
        />
      </Fragment>
    );
    const topBarPopoverContent = (
        <List>
          <ListItem onClick={this.logoutUser}>Log out</ListItem>
        </List>
    );

    const topbarRight = this.props.isLoggedIn ? (
      <div className="cui-top-bar__user">
        {/* <Popover
          direction="bottom-right"
          content={topBarPopoverContent}
          popoverTrigger="Click"
          closeOnClick> */}
          <button
            className="cui-avatar cui-button--none"
            aria-haspopup="true"
            onClick={this.logoutUser}>
            <img
              className="user-image"
              src={getAvatar()}
              alt="user"
            />
          </button>
        {/*</Popover> */}
      </div>
    ) : (
      <div className="cui-top-bar__logged-out">
        <Link to="/login">Log In</Link>
        <Button color="blue">Sign Up</Button>
      </div>
    );

    return (
      <Fragment>
        <Topbar
          title="Collab UI React Starter"
          color="dark"
          image={logoIcon}
          anchor="/"
          fixed>
          <TopbarNav>{navItems}</TopbarNav>
          <TopbarRight>{topbarRight}</TopbarRight>
          <TopbarMobile>
            {navItems}
            {/* <ListItemSeparator /> */}
      {topBarPopoverContent}
          </TopbarMobile>
        </Topbar>
      </Fragment>
    );
  }
}

AppHeader.propTypes = {
  actions: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    isLoggedIn: state.user.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppHeader);
