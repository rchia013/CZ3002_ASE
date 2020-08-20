import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import '../../node_modules/firebaseui/dist/firebaseui.css'


// Normal import doesn't seem to work
var firebase = require('firebase');
//var firebaseui = require('firebaseui');



/* Commented since apparently already initiated

var firebaseConfig = {
    apiKey: "AIzaSyAJC89W4Ri_RMi47vXwaB--Krtjz83_FRY",
    authDomain: "neadatabase.firebaseapp.com",
    databaseURL: "https://neadatabase.firebaseio.com",
    projectId: "neadatabase",
    storageBucket: "neadatabase.appspot.com",
    messagingSenderId: "545938314026",
    appId: "1:545938314026:web:4f2a985d905f3eb3224453",
    measurementId: "G-9H01WLR7DF"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

*/

/*ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});*/

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
