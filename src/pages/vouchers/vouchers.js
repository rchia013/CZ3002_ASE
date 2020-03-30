import React, { Component } from "react";
import { firebaseapp, database } from "../../base.js";
import { Button, Icon } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import "../Home/Home.css";
import "./vouchers.css";
import Popup from "../admin/popup.js";
import { Snackbar, TextField, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    url: "",
    cost: null,
    error: false,
    vouchers: null,
    dialog: false
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

  handleURL = e => {
    this.setState({
      url: e.target.value
    });
  };

  handleCost = e => {
    this.setState({
      cost: e.target.value
    });
  };

  handleCount = e => {
    this.setState({
      count: e.target.value
    });
  };

  handleDelete = e => {
    var target = e.target.id;
    firebaseapp
      .database()
      .ref("users")
      .on("value", snap => {
        var updates = {};
        snap.forEach(function(child) {
          updates["/users/" + child.key + "/vouchers/" + target] = null;
          firebaseapp
            .database()
            .ref()
            .update(updates);
        });
      });
    firebaseapp
      .database()
      .ref("vouchers/" + e.target.id)
      .remove();
  };

  handleSubmit = e => {
    if (
      this.state.title === "" ||
      this.state.desc === "" ||
      this.state.cost === null ||
      this.state.count === null ||
      this.state.url === ""
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
            cost: this.state.cost,
            count: this.state.count,
            url: this.state.url
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
    this.toggleDialog();
    this.setState({
      desc: "",
      title: "",
      cost: null,
      count: null,
      url: ""
    });
  };

  toggleDialog = () => {
    this.setState({
      dialog: !this.state.dialog
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
        <div
          class="vouchers"
          style={{
            width: "60%",
            color: "white",
            padding: "10px",
            backgroundColor: "white"
            // backgroundImage: `url(${this.state.vouchers[key]["url"]})`,
            // backgroundPosition: "center",
            // backgroundSize: "cover"
          }}
        >
          <img
            src={this.state.vouchers[key]["url"]}
            style={{ width: "100%" }}
          />
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
          <p>Remaining: {this.state.vouchers[key]["count"]} copies</p>
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
            clear: "both",
            backgroundColor: "beige"
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
            <h1 style={{ color: "black", height: "50px" }}>
              Current Vouchers
              <IconButton onClick={this.toggleDialog}>
                <AddIcon />
              </IconButton>
            </h1>
            <div
              class="voucher"
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap"
              }}
            >
              {temp}
            </div>
          </div>
          <div>
            <Dialog
              open={this.state.dialog}
              onClose={this.toggleDialog}
              aria-labelledby="edit-particulars-dialog"
            >
              <DialogTitle id="edit-particulars-dialog">
                Add Vouchers
              </DialogTitle>
              <DialogContent id="edit-particulars-dialog">
                <DialogContentText>Enter the voucher details</DialogContentText>
                <TextField
                  required
                  className="edit-particulars"
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  onChange={this.handleTitle}
                />
                <TextField
                  required
                  className="edit-particulars"
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  multiline="true"
                  rows="3"
                  onChange={this.handleDesc}
                />
                <TextField
                  required
                  className="edit-particulars"
                  label="Cost"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  onChange={this.handleCost}
                />
                <TextField
                  required
                  className="edit-particulars"
                  label="Count"
                  variant="outlined"
                  margin="normal"
                  type="number"
                  onChange={this.handleCount}
                />
                <TextField
                  required
                  className="edit-particulars"
                  label="Image URL Link (2:1 ratio or higher)"
                  variant="outlined"
                  margin="normal"
                  onChange={this.handleURL}
                >
                  {/* Please ensure the image is the ratio of 2:1 or higher */}
                </TextField>
              </DialogContent>
              <DialogActions id="edit-particulars-dialog">
                <Button onClick={this.toggleDialog} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleSubmit} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Snackbar
            className="profile-snackbar"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={this.state.error}
            autoHideDuration={2000}
            onClose={this.togglePopup}
            message="Your input is invalid! Try again."
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={this.togglePopup}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      );
    }
  }
}
export default Vouchers;
