import React, { Component } from "react";
import app from "../../base.js";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../../../node_modules/firebaseui/dist/firebaseui.css";

// Normal import doesn't seem to work
var firebase = require("firebase");
var firebaseui = require("firebaseui");

// Initialize the FirebaseUI Widget using Firebase.
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById("loader").style.display = "none";
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "/profile",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    //firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
    //firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  //tosUrl: '<your-tos-url>',
  // Privacy policy url.
  //privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.

// ui.start('#firebaseui-auth-container', uiConfig);

class Login extends Component {
  // Above calls UI and just renders in html below. May be better to put it here though.
  componentDidMount() {
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  render() {
    // Return HTML taken from Google example
    return (
      <div>
        <div id="firebaseui-auth-container"></div>
        <div id="loader">Loading...</div>
      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Login;
