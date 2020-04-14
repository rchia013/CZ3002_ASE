import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import '../../node_modules/firebaseui/dist/firebaseui.css'


// Normal import doesn't seem to work
var firebase = require('firebase');
//var firebaseui = require('firebaseui');





  // Initialize the FirebaseUI Widget using Firebase.
    
class Login extends Component{
    // Above calls UI and just renders in html below. May be better to put it here though.

  render(){

    // Return HTML taken from Google example
    return(
        <div >
            <div id="firebaseui-auth-container"></div>
            <div id="loader">Loading...</div>
        </div>
    );
    }
}

// Remember to export so that you can use this component elsewhere
export default Login;
