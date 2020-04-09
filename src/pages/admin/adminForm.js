import React, { Component } from "react";
import app from "../../base.js";
import Button from "@material-ui/core/Button";
import "./admin.css";
import { functions } from "../../base.js";
import Popup from "./popup.js";
import { Snackbar, TextField, Paper } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Alert } from "@material-ui/lab";

const addAdminRole = functions.httpsCallable("addAdminRole");

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false,
      dialog: false,
      failure: false
    };
  }

  handleChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    addAdminRole({
      email: this.state.email
    }).then(result => {
      console.log(result);
      if (result.data.success) {
        this.setState({
          success: true,
          dialog: false
        });
      } else {
        this.setState({ failure: true, dialog: false });
      }
    });
    this.setState({ email: "" });
  };

  //   clearInput = () => {
  //       document.getElementById("input1").reset();
  //   }
  togglePopup = () => {
    this.setState({
      dialog: !this.state.dialog
    });
  };

  toggleSnackbar = () => {
    this.setState({
      success: !this.state.success
    });
  };

  toggleFailure = () => {
    this.setState({
      failure: !this.state.failure
    });
  };
  render() {
    return (
      <div
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   marginTop: "100px"
      // }}
      >
        <Button
          classes={{ label: "admin-components" }}
          variant="contained"
          color="auto"
          size="small"
          onClick={this.togglePopup}
          style={{ backgroundColor: "lightgrey" }}
        >
          Add Admin
        </Button>
        <Dialog
          open={this.state.dialog}
          onClose={this.togglePopup}
          aria-labelledby="edit-particulars-dialog"
        >
          <DialogContent id="edit-particulars-dialog">
            <DialogContentText>
              Enter the user's email here to make admin
            </DialogContentText>
            <TextField
              required
              className="edit-particulars"
              label="Email"
              variant="outlined"
              margin="normal"
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions id="edit-particulars-dialog">
            <Button onClick={this.togglePopup} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          className="profile-snackbar"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
          }}
          open={this.state.success}
          autoHideDuration={2000}
          onClose={this.toggleSnackbar}
          message="Successfully added the user as admin!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={this.toggleSnackbar}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <Snackbar
          open={this.state.failure}
          autoHideDuration={3000}
          onClose={this.toggleFailure}
        >
          <Alert onClose={this.toggleFailure} severity="error">
            No such user exist in database!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default AdminForm;
