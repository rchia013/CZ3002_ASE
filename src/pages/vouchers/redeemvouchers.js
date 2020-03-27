import React, { Component } from "react";
import { firebaseapp } from "../../base.js";
import { Button } from "@material-ui/core";
import emailjs from 'emailjs-com'
import { Link as RouterLink } from "react-router-dom";
import "../Home/Home.css";
import "./vouchers.css";
import Popup from "../admin/popup.js";
import NavBar2 from "../../components/navbar2/navbar2.js";

const vouchersRef = firebaseapp
  .database()
  .ref()
  .child("vouchers");

const db = firebaseapp.database().ref();
var temp = null;

class RVouchers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      update: false,
      loaded: false,
      points: "updating...",
      userCurrentVouchers: null,
      alerted: false
    };
    this.handleRedeem = this.handleRedeem.bind(this);
  }

  handleRedeem = e => {
    var temp = e.target.id; //have to store this in a temporary variable bcoz firebase read is async.
    var currPoints = 0;
    var cost = 0;
    var count = 0;

    db.once("value").then(snap => {
      console.log("supposed to happen first");
      currPoints = snap
        .child("users")
        .child(this.state.user.uid)
        .child("points")
        .val();
      cost = snap
        .child("vouchers")
        .child(temp)
        .child("cost")
        .val();
      count = snap
        .child("vouchers")
        .child(temp)
        .child("count")
        .val();

      count--;
      if (currPoints - cost < 0) {
        this.setState({ alerted: true });
      } else {
        db.child("vouchers")
          .child(temp)
          .update({ count: count });
        db.child("users")
          .child(this.state.user.uid)
          .update({ points: currPoints - cost });

        db.child("users")
          .child(this.state.user.uid)
          .child("vouchers")
          .child(temp)
          .update({ name: temp });

        // Sending voucher email
        const templateParams = {
          to_name: this.state.user.displayName,
          to_email: this.state.user.email,
          voucher_name: temp,
          email_content: this.state.vouchers[temp]["desc"]
        };
        emailjs.send('gmail','template_8MKL7Ui0', templateParams, 'user_v3HTSBe6LX8JIwU6pC5w0')
      }
    });
  };

  togglePopup = () => {
    this.setState({
      alerted: false
    });
  };
  // Checks status and adds user to state

  checkStatus() {
    firebaseapp.auth().onAuthStateChanged(user => {
      if (user != null) {
        firebaseapp
          .database()
          .ref("users/" + user.uid + "/vouchers/")
          .on("value", snap => {
            if (snap.val() === null) {
              this.setState({
                userCurrentVouchers: ["snap.val()"],
                user: user,
                loaded: true
              });
            } else {
              this.setState({
                userCurrentVouchers: snap.val(),
                user: user,
                loaded: true
              });
            }
          });

        firebaseapp
          .database()
          .ref("users/" + user.uid + "/points")
          .on("value", snap => {
            this.setState({
              points: snap.val()
            });
          });

        // Dealing with admin
        firebaseapp
          .auth()
          .currentUser.getIdTokenResult()
          .then(idTokenResult => {
            this.setState({
              admin: idTokenResult.claims.admin
            });
          });
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
    if (this.state.loaded) {
      var tempArray = Object.keys(this.state.userCurrentVouchers);
      if (this.state.vouchers != null) {
        console.log(this.state.vouchers)
        temp = Object.keys(this.state.vouchers).map(key => {
          if (tempArray.includes(key)) {
            return (
              <div
                key={key}
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
                <button disabled id={key}>
                  Redeemed
                </button>
              </div>
            );
          } else {
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
          }
        });
      }
    }

    return this.state.loaded ? (
      <div>
        {this.state.alerted ? (
          <div className="alertbody">
            <div className="alert">
              Voucher cost exceeds available amount of points! &emsp;
              <Button
                style={{ position: "relative", bottom: "0px" }}
                variant="contained"
                onClick={this.togglePopup}
              >
                Return
              </Button>
            </div>
          </div>
        ) : null}
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
      </div>
    ) : (
      <div>Loading... Please Wait for a moment.</div>
    );
  }
}
export default RVouchers;
