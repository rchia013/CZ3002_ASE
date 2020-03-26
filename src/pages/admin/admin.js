import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import "../Home/Home.css";
import { base } from "../../base.js";
import "./admin.css";
import Button from "@material-ui/core/Button";
import "../../components/navbar/Navbar.css";
import { firebaseapp } from "../../base.js";
import AdminForm from "./adminForm.js";

class Admin extends Component {
  state = {};
  render() {
    return (
      <div>
        <div class="admin">
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
          <div class="container-test">
            <Button
              classes={{ label: "admin-components" }}
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/calendar"
            >
              View Schedule
            </Button>
            <Button
              classes={{ label: "admin-components" }}
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/adminorders"
            >
              View User History
            </Button>
            <Button
              classes={{ label: "admin-components" }}
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/vouchers"
            >
              Edit Vouchers
            </Button>
            <Button
              classes={{ label: "admin-components" }}
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/adminitems"
            >
              Edit Waste Selection
            </Button>
          </div>
        </div>
        <AdminForm></AdminForm>
      </div>
    );
  }
}

export default Admin;
