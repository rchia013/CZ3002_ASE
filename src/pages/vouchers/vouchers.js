import React, { Component } from "react";
import { firebaseapp, database } from "../../base.js";
import { Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "../Home/Home.css";
import "./vouchers.css";
import Popup from "../admin/popup.js";

const vouchersRef = firebaseapp
  .database()
  .ref()
  .child("vouchers");
class Vouchers extends Component {
  state = {
    admin: null,
    user: null,
    title: "",
    desc: "",
    cost: null,
    error: false,
    vouchers: null,
    titleError: false
  };

  handleTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  handleDesc = e => {
    this.setState({
      desc: e.target.value
    });
  };

  handleCost = e => {
    this.setState({
      cost: e.target.value
    });
  };

  handleDelete = e => {
    firebaseapp
      .database()
      .ref("vouchers/" + e.target.id)
      .remove();
  };

  handleSubmit = e => {
    if (
      this.state.title === "" ||
      this.state.desc === "" ||
      this.state.cost === null
    ) {
      this.setState({
        error: true
      });
    } else {
      firebaseapp
        .database()
        .ref("vouchers/" + this.state.title)
        .update(
          {
            desc: this.state.desc,
            cost: this.state.cost
          },
          function(error) {
            if (error) {
              console.log(error);
            } else {
              console.log("Update successful.");
            }
          }
        );
    }
    document.getElementById("form1").reset();
    this.setState({
      desc: "",
      title: "",
      cost: null
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
    var temp = null;
    if (this.state.vouchers != null) {
      temp = Object.keys(this.state.vouchers).map(key => (
        <div class="vouchers">
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
          <button id={key} onClick={this.handleDelete}>
            Delete
          </button>
        </div>
      ));
    }

    if (!this.state.admin) {
      return (
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              display: "flex",
              marginTop: "200px",
              fontSize: "30px"
            }}
          >
            Unauthorized access to this page! Please login using admin
            credentials at home page.
          </div>
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
      );
    } else {
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
          <div class="navbar">
            <nav class="navbar">
              <ul>
                <li>ADMIN</li>
                <li>
                  <a onClick={() => firebaseapp.auth().signOut()} href="/">
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="voucher-container1">
            <h1>Current Vouchers</h1>
            <div class="voucher">{temp}</div>
          </div>
          <div class="add-voucher">
            <h2 class="heading2">Add Voucher</h2>
            <form id="form1">
              <div id="input1">
                <label for="title">Title:&nbsp;</label>
                <input
                  required
                  type="text"
                  placeholder="Title"
                  id="title"
                  style={{ width: "40%" }}
                  onChange={this.handleTitle}
                ></input>
                <label for="cost" style={{ marginLeft: "10px" }}>
                  Cost:&nbsp;
                </label>
                <input
                  required
                  type="number"
                  placeholder="Number of Points"
                  id="cost"
                  style={{ width: "20%" }}
                  onChange={this.handleCost}
                ></input>
              </div>
              <div id="input2">
                <label for="desc">Description:&nbsp;</label>
                <textarea
                  required
                  id="clear2"
                  type="text"
                  id="desc"
                  style={{
                    width: "100%",
                    height: "100px",
                    justifyContent: "flex-start",
                    display: "flex",
                    alignItems: "flex-start"
                  }}
                  onChange={this.handleDesc}
                ></textarea>
              </div>
            </form>
            <Button id="submitbutton" onClick={this.handleSubmit}>
              Submit
            </Button>
          </div>
          {this.state.error ? (
            <Popup text="INVALID INPUT" closePopup={this.togglePopup} />
          ) : null}
        </div>
      );
    }
  }
}
export default Vouchers;
