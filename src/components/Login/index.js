import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './actions';
import { Button, Input } from '@collab-ui/react';

class LoginPage extends React.PureComponent {
  state = {
    email: '',
    formErrors: { email: '' },
    emailValid: false,
    formValid: false,
    formTouched: false,
  };

  handleEmailInput = e => {
    const value = e.target.value;
    this.setState({ email: value }, () => {
      this.validateEmail('email', value);
    });
  };

  validateEmail = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;

    emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    fieldValidationErrors.email = emailValid
      ? ''
      : `${value} is not a valid email address.`;

    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
      },
      this.validateForm
    );
  };

  validateForm = () => {
    this.setState({
      formValid: this.state.emailValid,
    });
  };

  handleBlur = () => {
    this.setState({
      formTouched: true,
    });
  };

  handleSubmit = e => {
    e && e.preventDefault();
    // console.log(this);
    this.props.actions.loginUser(this.state.email);
    this.props.history.push('/');
  };

  isFormError = () =>
    this.state.formTouched && (!this.state.formValid && this.state.email);

  render() {
    const webexLogo = require('@collab-ui/core/images/cisco-webex/wordmark/cisco-webex-wordmark-black.svg');

    return (
      <div className="cui-panel cui-panel--form cui-panel--full">
        <div className="cui-panel__main">
          <img className="cui-panel__image" src={webexLogo} alt="Cisco Webex" />
          <div className="cui-panel__title">Enter your email address</div>
          <form className="cui-panel__form">
            {/* {touched && (error && <span className="text-danger">{error}</span>)} */}
            <div
              className="cui-input__messages error"
              style={{
                display: this.isFormError() ? 'block' : 'none',
              }}>
              <div className="message">{this.state.formErrors.email}</div>
            </div>
            <Input
              htmlId="email"
              name="email"
              type="text"
              placeholder="Email Address"
              onDoneEditing={this.handleBlur}
              onChange={this.handleEmailInput}
              className={`${this.isFormError() ? ` error` : ''}`}
            />
            <div className="cui-panel__cta">
              <Button
                type="submit"
                color="blue"
                disabled={!this.state.formValid}
                onClick={this.handleSubmit}>
                Next
              </Button>
            </div>
          </form>
          <div className="cui-panel__secondary-action">
            {/* eslint-disable jsx-a11y/anchor-is-valid */}
            Need help signing in? <a href="#">Contact Support</a>
          </div>
        </div>
        <div className="cui-panel__footer">
          <div className="footer__logo">
            <i className="icon icon-cisco-logo" />
          </div>
          <div className="footer__copyright">
            By using Webex Teams you accept the
            <a href="#">Terms of Service</a>,{' '}
            <a href="#">Privacy Statement, Notices & Disclaimers</a>.
            {/* eslint-enable jsx-a11y/anchor-is-valid */}
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loggedIn: state.user.loggedIn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
