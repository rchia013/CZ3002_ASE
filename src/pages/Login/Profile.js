import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import './Home.css'
import {base} from '../base.js'


var firebase = require('firebase');
var updateOnce=0
var loginStatus = false

class Profile extends Component{


    // Checks current login status
    checkStatus(){
        var user = firebase.auth().currentUser

        if (user) {
            return true
        } else {
            return false
        }
    }


    componentDidMount(){
        this.getOrders()
    }

    // Reads data from firebase as an object
    // Can try to clean up this data, super messy in this form
    getOrders(){
        console.log("getOrders")
        base.fetch('orders', {
            context: this,
            then(data){
                this.setState({temp: data})
            }
        })
    }

    getUserOrders(){
        console.log(firebase.auth().currentUser.uid)
        base.fetch('orders/' + firebase.auth().currentUser.uid,{
            context: this,
            then(data){
                this.setState(data)
            }
        })
    }

    

  render(){
    
    if (updateOnce==0){
        loginStatus = this.checkStatus()
        if (loginStatus){
            delete this.state.temp
            this.getUserOrders()
            updateOnce += 1
            console.log(updateOnce)
        }
    }
    
    
    // console.log(firebase.auth().currentUser)
    // this.getUserOrders()
    //console.log(firebase.auth().currentUser.displayName)
    // Functions to be run should be put here. And other stuff that I'm probably not aware of.
    // Note that ComponentWillMount() etc will be above in the function area (see Wasteitem.js)
    // These special functions will, generally speaking, run before anything is loaded

    // Return is basically the html for whatever you want displayed. 
    // Note that you can only return one html element, so in this case i wrapped everything in 
    // <div class="home_content">

    return(
        <div class="home_content">
                <h1>Profile Details (Sorry HTML looks like shit now)</h1>
                <p>The user is <b>{loginStatus ? 'currently' : 'not'}</b> logged in.</p>
                <p>{loginStatus ? 
                    (<p> Logged in as {firebase.auth().currentUser.displayName}</p>)
                    :
                    (<p>Not logged in </p>)}</p>
                <br />
                <h1>Order History</h1>
                <p>{JSON.stringify(this.state)}</p>

                <Button 
                    variant="contained" color="primary" size="large" 
                    component={RouterLink} to="/">
                        Home
                </Button>
        </div>
    );
    }
}

// Remember to export so that you can use this component elsewhere
export default Profile;
