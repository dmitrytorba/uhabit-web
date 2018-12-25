import React, { Component } from "react";
import firebaseui from "firebaseui"
import firebase from "../firebase"
import { connect } from "react-redux";

class Login extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: function(authResult, redirectUrl) {
          this.props.history.push('/')
          return false;
        },
        uiShown: function() {
          // The widget is rendered.
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'redirect',
      signInSuccessUrl: '/',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: '<your-tos-url>',
      // Privacy policy url.
      privacyPolicyUrl: '<your-privacy-policy-url>'
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  render() {
    return (
      <div>
        <link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/3.1.1/firebaseui.css" />
        <div id="firebaseui-auth-container"></div>
      </div>
    )
  }
};

export default connect(
  state => ({}),
  dispatch => ({ dispatch })
)(Login);