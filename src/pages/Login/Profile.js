import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../Home/Home.css";
import { app, base } from "../../base.js";
import { Redirect } from "react-router";
import Admin from "../admin/admin.js";
import Navbar from "../../components/navbar/Navbar";

var firebase = require("firebase");
var updateOnce = 0;
var loginStatus = false;

class Profile extends Component {
  state = {
    admin: null
  };
  // Checks current login status
  checkStatus() {
    var user = firebase.auth().currentUser;
    console.log(user)

    if (user) {
      firebase
        .auth()
        .currentUser.getIdTokenResult()
        .then(idTokenResult => {
          this.setState({
            admin: idTokenResult.claims.admin
          });
        });
      return true;
    } else {
      return false;
    }
  }

  componentWillMount(){
    this.getOrders();
    this.checkStatus();
  }

  componentDidMount() {
    // this.checkStatus();
    this.getUserOrders();
    
  }

  // Reads data from firebase as an object
  // Can try to clean up this data, super messy in this form
  getOrders() {
    console.log("getOrders");
    base.fetch("orders", {
      context: this,
      then(data) {
        this.setState({ temp: data });
      }
    });
    
    delete this.state.temp;
  }

  getUserOrders() {
    base.fetch("orders/" + firebase.auth().currentUser.uid, {
      context: this,
      then(data) {
        this.setState(data);
      }
    });
  }

  render() {
    

    return (
      <div>
        {this.state.admin ? (
          <div class="home_content">
            <Admin />
          </div>
        ) : (
          <div class="home_content">
            <Navbar></Navbar>
            <div class="user">
              <h1>Profile Details</h1>
              <p class="para">
                The user is {loginStatus ? "currently" : "not"} logged in
              </p>
              <p class="para">
                {loginStatus ? (
                  <p>as {firebase.auth().currentUser.displayName}</p>
                ) : null}
              </p>
              <br />
              <h1>Order History</h1>
              <p>{JSON.stringify(this.state)}</p>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/"
              >
                Home
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Profile;
