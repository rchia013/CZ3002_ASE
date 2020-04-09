import React, { Component } from "react";
import { firebaseapp } from "../../base.js";
import { Button } from "@material-ui/core";
import emailjs from "emailjs-com";
import "../Home/Home.css";
import "./redeemvouchers.css";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import AliceCarousel from "react-alice-carousel";
import Navbar2 from "../../components/navbar2/navbar2.js";

const vouchersRef = firebaseapp
  .database()
  .ref()
  .child("vouchers");

const db = firebaseapp.database().ref();
var temp = null;

class RVouchers2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      update: false,
      loaded: false,
      points: "updating...",
      userCurrentVouchers: null,
      alerted: false,
      success: false
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
        emailjs
          .send(
            "gmail",
            "template_8MKL7Ui0",
            templateParams,
            "user_v3HTSBe6LX8JIwU6pC5w0"
          )
          .then(() => {
            this.setState({ success: true });
            setTimeout(() => {
              window.location.reload();
            }, 2500);
          });
      }
    });
  };

  togglePopup = () => {
    this.setState({
      alerted: false
    });
  };
  // Checks status and adds user to state
  onSlideChange(e) {
    console.log("Item`s position during a change: ", e.item);
    console.log("Slide`s position during a change: ", e.slide);
  }

  onSlideChanged(e) {
    console.log("Item`s position after changes: ", e.item);
    console.log("Slide`s position after changes: ", e.slide);
  }
  toggleSnackbar = () => {
    this.setState({ success: !this.state.success });
  };
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
        console.log(this.state.vouchers);
        temp = Object.keys(this.state.vouchers).map(key => {
          if (tempArray.includes(key)) {
            return (
              <div
                class="vouchers"
                style={{
                  backgroundColor: "lightgrey",
                  height: "300px"
                }}
              >
                <img
                  class="voucher_images"
                  src={this.state.vouchers[key]["url"]}
                ></img>
                <div class="voucher_description">
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "black"
                    }}
                  >
                    {key}
                  </h2>
                  <div style={{ height: "40px" }}>
                    {this.state.vouchers[key]["desc"]}
                  </div>
                  <div style={{ color: "red" }}>
                    Cost: {this.state.vouchers[key]["cost"]} points
                  </div>
                  <button
                    id={key}
                    style={{ position: "relative", bottom: "0px" }}
                    onClick={this.handleRedeem}
                    disabled
                  >
                    Redeemed
                  </button>
                </div>
              </div>
            );
          } else {
            return (
              <div
                class="vouchers"
                style={{
                  backgroundColor: "white",
                  height: "300px"
                }}
              >
                <img
                  class="voucher_images"
                  src={this.state.vouchers[key]["url"]}
                ></img>
                <div class="voucher_description">
                  <h2
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      color: "black"
                    }}
                  >
                    {key}
                  </h2>
                  <div style={{ height: "40px" }}>
                    {this.state.vouchers[key]["desc"]}
                  </div>
                  <div style={{ color: "red" }}>
                    Cost: {this.state.vouchers[key]["cost"]} points
                  </div>
                  <button
                    id={key}
                    style={{ position: "relative", bottom: "0px" }}
                    onClick={this.handleRedeem}
                  >
                    Redeem
                  </button>
                </div>
              </div>
            );
          }
        });
      }
    }

    return this.state.loaded ? (
      <div class="voucher-container">
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
        <Navbar2></Navbar2>
        <div style={{ height: "381px", marginTop: "58px", width: "40%" }}>
          <AliceCarousel
            autoHeight={true}
            duration={400}
            autoPlay={true}
            startIndex={1}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            autoPlayInterval={2000}
            autoPlayDirection="ltr"
            autoPlayActionDisabled={true}
            onSlideChange={this.onSlideChange}
            onSlideChanged={this.onSlideChanged}
          >
            {temp}
          </AliceCarousel>
        </div>
        <h2
          style={{
            marginTop: "100px",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            color: "black",
            // border: "2px solid black",
            position: "absolute",
            bottom: "20px"
          }}
        >
          Current Points: {this.state.points}
        </h2>
        <Snackbar
          open={this.state.success}
          autoHideDuration={3000}
          onClose={this.toggleSnackbar}
        >
          <Alert onClose={this.toggleSnackbar} severity="success">
            Successfully redeemed voucher! Check your email for further details.
            Page will now reload....
          </Alert>
        </Snackbar>
      </div>
    ) : (
      <div>Loading... Please Wait for a moment.</div>
    );
  }
}
export default RVouchers2;
