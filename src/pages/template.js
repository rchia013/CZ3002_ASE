/*  TO MAKE LIFE EASIER, THIS IS A TEMPLATE YOU CAN USE TO CREATE COMPONENTS.
    THE BENEFIT OF THIS IS THAT YOU DON'T HAVE TO KEEP EDITING EXISTING COMPONENTS WHICH MEANS
    OTHERS DON'T HAVE TO UPDATE THEIR FILES AS MUCH SINCE COMPONENTS ARE GENERALLY INDEPENDENT OF EACH
    OTHER, UNLESS YOU PASS PROPS AND STUFF.

    THE SIMPLEST WAY TO DISPLAY YOUR COMPONENT IS TO ADD IT TO APP.JS. SIMPLY ADD A ROUTE AND SOME
    PLACEHOLDER URL. ACCESS IT BY ENTERING URL AT THE END OF THE LOCALHOST:3000.
*/

// Import stuff here. You'll need the first line for sure.
import React, { Component } from 'react';

// Other packages you want to import
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import '../../node_modules/firebaseui/dist/firebaseui.css'


// For some cases, you may need to import this way. Normal import doesn't seem to work. If you
// encounter this problem, don't panic and try this maybe
var firebase = require('firebase');
var firebaseui = require('firebaseui');


// This is a class based component
class Login extends Component{
    // Above calls UI and just renders in html below. May be better to put it here though.

    render(){

    //  You can have some functions here, run them and do logic stuff here.


    /*  For return, remember that you have to wrap everything in a singple container. In this case,
        I used a <div>. A single <p> works to its up to you, but usually I use <div> */
        return(
            <div>
                {/* Example of ternary inline if-else nonsense. It can be useful in some cases.
                    I implemented it in History and Home for now, at the bottom of both pages.
                    Will update here when I eventually create the sidemenu nonsense. */ }
                <p>{loginStatus ? 
                    (<p> Logged in as {firebase.auth().currentUser.displayName}</p>)
                    :
                    (<p>Not logged in </p>)}</p>
            </div>
        )}
}

// Remember to export so that you can use this component elsewhere
export default Login;
