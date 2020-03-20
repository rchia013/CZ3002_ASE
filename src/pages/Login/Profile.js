import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../Home/Home.css";
import { base } from "../../base.js";
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

  componentDidMount() {
    this.getOrders();
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
  }

  getUserOrders() {
    console.log(firebase.auth().currentUser.uid);
    base.fetch("orders/" + firebase.auth().currentUser.uid, {
      context: this,
      then(data) {
        this.setState(data);
      }
    });
  }

  render() {
    if (updateOnce == 0) {
      loginStatus = this.checkStatus();
      if (loginStatus) {
        delete this.state.temp;
        this.getUserOrders();
        updateOnce += 1;
        console.log(updateOnce);
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
