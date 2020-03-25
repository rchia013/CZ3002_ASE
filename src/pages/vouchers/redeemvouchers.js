import React, { Component } from "react";
import { firebaseapp, database } from "../../base.js";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "../Home/Home.css";
import "./vouchers.css";
import Popup from "../admin/popup.js";
import NavBar2 from "../../components/navbar2/navbar2.js";

const vouchersRef = firebaseapp
  .database()
  .ref()
  .child("vouchers");

var temp = null;

class RVouchers extends Component {
  state = { user: null, update: false, points: "updating..." };

  handleRedeem = e => {
    var counter = 0;
    vouchersRef
      .child(e.target.id)
      .child("count")
      .on("value", snap => {
        counter = snap.val();
      });
    counter--;

    firebaseapp
      .database()
      .ref("vouchers/" + e.target.id)
      .update({
        count: counter
      });

    firebaseapp
      .database()
      .ref("users/" + this.state.user.uid + "/vouchers/" + e.target.id)
      .set({ name: e.target.id });
  };

  refresh = () => {
    this.setState({ update: true });
    firebaseapp
      .database()
      .ref("users/" + this.state.user.uid + "/points")
      .on("value", snap => {
        this.setState({
          points: snap.val()
        });
      });
  };
  togglePopup = () => {
    this.setState({
      error: false
    });
  };
  // Checks status and adds user to state

  checkStatus() {
    firebaseapp.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.setState({ user: user });

        // Dealing with admin
        firebaseapp
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            this.setState({
              admin: idTokenResult.claims.admin
            });
          });

        // console.log("done setting state");
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.checkStatus();
    vouchersRef.on("value", snap => {
      this.setState({
        vouchers: snap.val()
      });
    });
  }

  render() {
    // console.log(this.state.vouchers);
    var temp1 = 1;
    if (this.state.vouchers != null) {
      temp = Object.keys(this.state.vouchers).map(key => {
        firebaseapp
          .database()
          .ref("users/" + this.state.user.uid + "/vouchers")
          .on("value", snap => {
            if (snap.hasChild(key)) {
              console.log(key);
              temp1 = false;
            } else {
              temp1 = true;
            }
          });
        if (temp === 1) {
          return null;
        }
        if (temp1 === true) {
          return (
            <div
              class="vouchers"
              style={{
                backgroundColor: "lightgrey"
              }}
            >
              <h2
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "black"
                }}
              >
                {key}
              </h2>
              <div>{this.state.vouchers[key]["desc"]}</div>
              <div style={{ color: "red" }}>
                Cost: {this.state.vouchers[key]["cost"]} points
              </div>
              <button id={key} onClick={this.handleRedeem}>
                Redeem
              </button>
            </div>
          );
        } else if (temp1 === false) {
          return (
            <div
              class="vouchers"
              style={{
                backgroundColor: "grey"
              }}
            >
              <h2
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "black"
                }}
              >
                {key}
              </h2>
              <div>{this.state.vouchers[key]["desc"]}</div>
              <div style={{ color: "red" }}>
                Cost: {this.state.vouchers[key]["cost"]} points
              </div>
              <button disabled id={key} onClick={this.handleRedeem}>
                Redeemed
              </button>
            </div>
          );
        }
      });
    }

    if (temp1 !== 1) {
      if (this.state.user !== null) {
        return (
          <div
            style={{
              overflowY: "scroll",
              height: "100vh",
              display: "flex",
              flexWrap: "wrap",
              clear: "both"
            }}
          >
            <NavBar2></NavBar2>
            <h2
              style={{
                marginTop: "100px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                color: "white"
              }}
            >
              Current Points: {this.state.points}
            </h2>
            <div
              class="voucher-container1"
              style={{ border: "2px solid black", marginTop: "10px" }}
            >
              <h1>Current Vouchers</h1>
              <div class="voucher">{temp}</div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return (
        <div>
          <h2>Please wait 10 seconds for the page to load...</h2>
          <button onClick={this.refresh}>
            Click Here if page is still not loading
          </button>
        </div>
      );
    }
  }
}
export default RVouchers;
