import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../Home/Home.css";
import { firebaseapp, base } from "../../base.js";
import { Redirect } from "react-router";
import Admin from "../admin/admin.js";
import Navbar from "../../components/navbar/Navbar";

var firebase = require("firebase");
var loginStatus = false;

class Profile2 extends Component {
  state = {
    admin: null,
    user: null
  };

  // Checks status and adds user to state
  checkStatus() {
    firebaseapp.auth().onAuthStateChanged((user) => {
      if (user!=null) {
        this.setState({ user: user })

        // Dealing with admin
        firebaseapp.auth().currentUser.getIdTokenResult()
        .then(idTokenResult => {
          this.setState({
            admin: idTokenResult.claims.admin
          })
        })

        console.log("done setting state")
        this.getUserOrders()
      } else {
        this.setState({ user: null });
      }
    });
  }


  componentDidMount() {
    this.checkStatus()
  }


  getUserOrders() {
    base.fetch("orders/" + this.state.user.uid, {
      context: this,
      then(data) {
        this.setState({ orderdata: data} );
      }
    });
  }

  render() {
    

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
                Currently {(this.state.user!=null) ? "" : "not"} logged in
              </p>
              <p class="para">
                {(this.state.user!=null) ? (
                  <p>as {this.state.user.displayName}</p>
                ) : null}
              </p>
              <br />
              <h1>Order History</h1>
              <p>{JSON.stringify(this.state.orderdata)}</p>
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
export default Profile2;
