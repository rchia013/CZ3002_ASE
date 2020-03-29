import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import Admin from "../admin/admin.js";
import Navbar2 from "../../components/navbar2/navbar2";
import "./Profile2.css";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Snackbar, TextField, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

var firebase = require("firebase");

class Profile2 extends Component {
  state = {
    admin: null,
    user: null,
    dialog: false,
    snackbar: false,
    passworddialog: false
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

        console.log("done setting state");
        this.getUserOrders();
        this.getUserDetails();
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.checkStatus();
  }

  getUserOrders() {
    base.bindToState("orders/" + this.state.user.uid, {
      context: this,
      state: "orderdata",
      asArray: true
    });
  }

  getUserDetails() {
    base.fetch("users/" + this.state.user.uid, {
      context: this,
      //asArray: true,
      then(data) {
        if (data != null) {
          this.setState({
            userDetails: data,
            address: data.address,
            zip: data.zip,
            phone: data.phone,
            name: this.state.user.displayName
          });
        }
      }
    });
  }

  deleteOrder(user_id, orderID) {
    firebaseapp
      .database()
      .ref("/orders/" + user_id + "/" + orderID)
      .remove();
    this.setState({ snackbar: true });
    // Firebase updated
  }

  // For editing particulars
  handleTextChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  handlePasswordReset = e => {
    firebaseapp.auth().sendPasswordResetEmail(this.state.user.email);
    this.setState({ passworddialog: true });
  };

  handleClickOpen = e => {
    this.setState({ dialog: true });
  };

  handlePasswordClose = e => {
    this.setState({ passworddialog: false });
  };

  handleClose = e => {
    if (this.state.userDetails != null) {
      this.setState({
        dialog: false,
        address: this.state.userDetails.address,
        zip: this.state.userDetails.zip,
        phone: this.state.userDetails.phone,
        name: this.state.user.displayName
      });
    } else {
      this.setState({
        dialog: false,
        address: "",
        zip: "",
        phone: "",
        name: ""
      });
    }
  };

  // Updates user details to firebase database
  handleSubmitandClose = e => {
    var userDetailsUpdate = {
      address: this.state.address,
      zip: this.state.zip,
      phone: this.state.phone
    };
    var updates = {};
    updates["users/" + this.state.user.uid] = userDetailsUpdate;

    this.setState({ dialog: false, userDetails: userDetailsUpdate });

    firebaseapp.auth().currentUser.updateProfile({
      displayName: this.state.name
    });
    return firebase
      .database()
      .ref()
      .update(updates);
  };

  handleSnackClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    this.setState({ snackbar: false });
  };

  render() {
    console.log(this.state);

    // Table rows
    var temporders2 = this.state.orderdata;
    if (temporders2 != null) {
      console.log(temporders2);
      var listItems2 = (
        <TableBody>
          {temporders2.map(d =>
            d.calendarEvents != null ? (
              <TableRow>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.key}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Plastic Bottles"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Plastic Bag"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Shampoo Bottles"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Batteries"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Phones"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Computer"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Mason Jar"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Glass Bottles"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Light Bulb"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Florescent Tubes"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d["Fairy Lights"]}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.calendarEvents != null
                    ? d.calendarEvents.start.substr(
                        0,
                        d.calendarEvents.start.indexOf("T")
                      )
                    : null}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.calendarEvents != null
                    ? d.calendarEvents.start.substr(
                        d.calendarEvents.start.indexOf("T") + 1
                      )
                    : null}
                  {d.calendarEvents != null ? (
                    <p class="table_text"> - </p>
                  ) : null}
                  {d.calendarEvents != null
                    ? d.calendarEvents.end.substr(
                        d.calendarEvents.end.indexOf("T") + 1
                      )
                    : null}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.address}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.zip}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.phone}
                </TableCell>
                <TableCell className="table-cell-scheduled" align="right">
                  {d.approved == null || d.approved != true ? (
                    <p class="table_text">Pending</p>
                  ) : (
                    d["points"]
                  )}
                </TableCell>

                {/* For order approval */}
                <TableCell className="table-cell-scheduled" align="right">
                  {d.approved == null || d.approved != true ? (
                    <Button
                      className="delete-btn"
                      variant="contained"
                      color="auto"
                      size="large"
                      onClick={() => this.deleteOrder(d.id, d.key)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      className="approved-btn"
                      variant="contained"
                      color="auto"
                      size="large"
                      disabled
                    >
                      Approved
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell align="right">{d.key}</TableCell>
                <TableCell align="right">{d["Plastic Bottles"]}</TableCell>
                <TableCell align="right">{d["Plastic Bag"]}</TableCell>
                <TableCell align="right">{d["Shampoo Bottles"]}</TableCell>
                <TableCell align="right">{d["Batteries"]}</TableCell>
                <TableCell align="right">{d["Phones"]}</TableCell>
                <TableCell align="right">{d["Computer"]}</TableCell>
                <TableCell align="right">{d["Mason Jar"]}</TableCell>
                <TableCell align="right">{d["Glass Bottles"]}</TableCell>
                <TableCell align="right">{d["Light Bulb"]}</TableCell>
                <TableCell align="right">{d["Florescent Tubes"]}</TableCell>
                <TableCell align="right">{d["Fairy Lights"]}</TableCell>
                <TableCell align="right">
                  {d.calendarEvents != null
                    ? d.calendarEvents.start.substr(
                        0,
                        d.calendarEvents.start.indexOf("T")
                      )
                    : null}
                </TableCell>
                <TableCell align="right">
                  {d.calendarEvents != null
                    ? d.calendarEvents.start.substr(
                        d.calendarEvents.start.indexOf("T") + 1
                      )
                    : null}
                  {d.calendarEvents != null ? (
                    <p class="table_text"> - </p>
                  ) : null}
                  {d.calendarEvents != null
                    ? d.calendarEvents.end.substr(
                        d.calendarEvents.end.indexOf("T") + 1
                      )
                    : null}
                </TableCell>
                <TableCell align="right">{d.address}</TableCell>
                <TableCell align="right">{d.zip}</TableCell>
                <TableCell align="right">{d.phone}</TableCell>
                <TableCell align="right">
                  {d.approved == null || d.approved != true ? (
                    <p class="table_text">Pending</p>
                  ) : (
                    d["points"]
                  )}
                </TableCell>

                {/* For order approval */}
                <TableCell align="right">
                  {d.approved == null || d.approved != true ? (
                    <Button
                      className="delete-btn"
                      variant="contained"
                      color="auto"
                      size="large"
                      onClick={() => this.deleteOrder(d.id, d.key)}
                    >
                      Delete
                    </Button>
                  ) : (
                    <Button
                      className="delete-btn"
                      variant="contained"
                      color="auto"
                      size="large"
                      disabled
                    >
                      Approved
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      );
    } else {
      var listItems2 = <p>Nothing yet</p>;
    }

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
      <div>
        <div class="profile_navbar">
          <Navbar2 />
        </div>
        {this.state.admin ? (
          <div class="admin_content">
            <Admin />
          </div>
        ) : (
          <div class="profile_page">
            <div class="profile_content">
              <section class="user">
                {this.state.user != null ? (
                  <div class="user_welcome">
                    <h1>Welcome {this.state.user.displayName}</h1>
                    <Paper className="particulars-paper">
                      <h3>My Particulars</h3>
                      {this.state.userDetails == null ||
                      Object.entries(this.state.userDetails).length == 0 ? (
                        <p class="empty-description">
                          Nothing yet! Click on Edit Particulars to update!
                        </p>
                      ) : (
                        <p>
                          Address: {this.state.userDetails.address} <br />
                          ZIP Code: S{this.state.userDetails.zip} <br />
                          Phone: {this.state.userDetails.phone} <br />
                          Total points: {this.state.userDetails.points}
                        </p>
                      )}
                    </Paper>
                    <Button
                      variant="contained"
                      color="auto"
                      size="large"
                      onClick={this.handleClickOpen}
                    >
                      Edit Particulars
                    </Button>
                    <Button
                      variant="contained"
                      color="auto"
                      size="large"
                      onClick={this.handlePasswordReset}
                    >
                      Reset Password
                    </Button>
                    <Button
                      variant="contained"
                      color="auto"
                      size="large"
                      component={RouterLink}
                      to="/redeemvouchers"
                    >
                      Redeem Vouchers
                    </Button>
                    <p>
                      <small>Scroll down to see Order History</small>
                    </p>
                  </div>
                ) : (
                  <h1>Currently not logged in</h1>
                )}

                <Dialog
                  open={this.state.dialog}
                  onClose={this.handleClose}
                  aria-labelledby="edit-particulars-dialog"
                >
                  <DialogTitle id="edit-particulars-dialog">
                    Edit Particulars
                  </DialogTitle>
                  <DialogContent id="edit-particulars-dialog">
                    <DialogContentText>
                      Enter your particulars
                    </DialogContentText>
                    <TextField
                      className="edit-particulars"
                      id="Name"
                      label="Name"
                      variant="outlined"
                      margin="normal"
                      value={this.state.name}
                      onChange={this.handleTextChange("name")}
                    />
                    <TextField
                      className="edit-particulars"
                      id="address"
                      label="Address"
                      variant="outlined"
                      margin="normal"
                      value={this.state.address}
                      onChange={this.handleTextChange("address")}
                    />
                    <TextField
                      className="edit-particulars"
                      id="zip"
                      label="ZIP Code"
                      variant="outlined"
                      margin="normal"
                      value={this.state.zip}
                      onChange={this.handleTextChange("zip")}
                    />
                    <TextField
                      className="edit-particulars"
                      id="phone"
                      label="Contact No"
                      variant="outlined"
                      margin="normal"
                      value={this.state.phone}
                      onChange={this.handleTextChange("phone")}
                    />
                  </DialogContent>
                  <DialogActions id="edit-particulars-dialog">
                    <Button onClick={this.handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={this.handleSubmitandClose} color="primary">
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={this.state.passworddialog}
                  onClose={this.handleClose}
                  aria-labelledby="edit-particulars-dialog"
                >
                  <DialogTitle id="edit-particulars-dialog">
                    Password Reset
                  </DialogTitle>
                  <DialogContent id="edit-particulars-dialog">
                    <DialogContentText>
                      A confirmation email has been sent to your registered
                      email account. Please follow the link in the email to
                      reset your password.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions id="edit-particulars-dialog">
                    <Button onClick={this.handlePasswordClose} color="primary">
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>
              </section>
              <section class="orderHistory">
                <div class="userorderHistory">
                  <h2>Order History</h2>
                  <Paper className="user_order_table_paper">
                    <TableContainer className="user_order_table_container">
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell align="right">Plastic Bottles</TableCell>
                            <TableCell align="right">Plastic Bag</TableCell>
                            <TableCell align="right">Shampoo Bottles</TableCell>
                            <TableCell align="right">Batteries</TableCell>
                            <TableCell align="right">Phones</TableCell>
                            <TableCell align="right">Computer</TableCell>
                            <TableCell align="right">Mason Jar</TableCell>
                            <TableCell align="right">Glass Bottles</TableCell>
                            <TableCell align="right">Light Bulb</TableCell>
                            <TableCell align="right">
                              Florescent Tubes
                            </TableCell>
                            <TableCell align="right">Fairy Lights</TableCell>
                            <TableCell className="address" align="right">
                              Date
                            </TableCell>
                            <TableCell className="address" align="right">
                              Pickup Window
                            </TableCell>
                            <TableCell className="address" align="right">
                              Address
                            </TableCell>
                            <TableCell align="right">ZIP</TableCell>
                            <TableCell align="right">Contact No</TableCell>
                            <TableCell align="right">Points Earned</TableCell>
                            <TableCell align="center">Status</TableCell>
                          </TableRow>
                        </TableHead>
                        {listItems2}
                      </Table>
                    </TableContainer>
                  </Paper>
                  <div class="test_button">
                    <Button
                      variant="contained"
                      color="auto"
                      size="large"
                      component={RouterLink}
                      to="/"
                    >
                      Home
                    </Button>
                  </div>
                </div>
              </section>
            </div>

            <Snackbar
              className="profile-snackbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              open={this.state.snackbar}
              autoHideDuration={2000}
              onClose={this.handleSnackClose}
              message="Success! Refresh the page to update!"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={this.handleSnackClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          </div>
        )}
      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Profile2;
