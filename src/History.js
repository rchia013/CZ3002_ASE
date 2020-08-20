// This is a placeholder for checking order histories
// May be useful when we actually implement the thingy in user profile
// Access this by manually typing /History at the url bar

import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { base } from '../base.js'
import Button from '@material-ui/core/Button'


var firebase = require('firebase');

// This component receives props (aka variables/state) from previous page(Wasteitem)
// It prints the state from the previous page, passed through the Link from react-router

class History extends Component{
    
    // Initial state set to empty
    state = {}

    // When component mounts, retrieve data from firebase
    componentWillMount(){
        this.getOrders()
    }

    // Reads data from firebase as an object
    // Can try to clean up this data, super messy in this form
    getOrders(){
        base.fetch('orders', {
            context: this,
            //asArray: true,
            then(data){
                this.setState(data)
            }
        })
    }
    
    checkStatus(){
        var user = firebase.auth().currentUser;

        if (user) {
            return true
        } else {
            return false
        }
    }
    


  render(){
    var loginStatus = this.checkStatus()
    
    // console.log is useful for debugging, you can see it update in Chrome under Inspect Element > Console
    return(
        <div class="history_page">
            {/* stringify used because you can't display objects */}
            <h1>Past Orders</h1>
            <p>{JSON.stringify(this.state)}</p>

            <p>The user is <b>{loginStatus ? 'currently' : 'not'}</b> logged in.</p>

            {/* This button serves as a link, uses react-router */}
            <div class="home_button">
                <Button 
                    variant="contained" color="primary" size="large"  
                    component={RouterLink} to="/">
                    Home
                </Button>
            </div>

            {/* This button serves as a link, uses react-router */}
            <div class="home_button">
                <Button 
                    variant="contained" color="primary" size="large"  
                    component={RouterLink} to="/profile">
                    Profile
                </Button>
            </div>
        </div>
    );
    }
}

export default History;
