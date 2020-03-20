import React, { Component } from "react";
import app from "../../base.js";
import Button from "@material-ui/core/Button";
import "./admin.css";
import { base } from "../../base.js";
import { functions } from "../../base.js";
import Popup from "./popup.js";

const addAdminRole = functions.httpsCallable("addAdminRole");

class AdminForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success: false
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
          success: true
        });
      }
    });
  };

  //   clearInput = () => {
  //       document.getElementById("input1").reset();
  //   }
  togglePopup = () => {
    document.getElementById("form").reset();
    this.setState({
      success: false,
      email: ""
    });
  };
  render() {
    return (
      <div class="form">
        <form id="form">
          <input
            type="email"
            placeholder="User email"
            onChange={this.handleChange}
          ></input>
          <Button variant="contained" onClick={this.handleSubmit}>
            Make Admin
          </Button>
        </form>
        {this.state.success ? (
          <Popup
            text="Successfully added as admin!"
            closePopup={this.togglePopup}
          />
        ) : null}
      </div>
    );
  }
}

export default AdminForm;
