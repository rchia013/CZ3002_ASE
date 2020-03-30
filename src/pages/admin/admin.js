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
      <div style={{ height: "1000px", backgroundColor: "beige" }}>
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
            <div style={{ margin: "15px" }}>
              <AdminForm />
            </div>
            <div style={{ margin: "15px" }}>
              <Button
                classes={{ label: "admin-components" }}
                variant="contained"
                color="auto"
                size="small"
                component={RouterLink}
                to="/adminschedule"
                style={{ backgroundColor: "lightgrey" }}
              >
                View Schedule
              </Button>
            </div>
            <div style={{ margin: "15px" }}>
              <Button
                classes={{ label: "admin-components" }}
                variant="contained"
                color="primary"
                size="small"
                style={{ backgroundColor: "lightgrey" }}
                component={RouterLink}
                to="/adminorders"
              >
                View User History
              </Button>
            </div>
            <div style={{ margin: "15px" }}>
              <Button
                classes={{ label: "admin-components" }}
                variant="contained"
                color="primary"
                size="small"
                style={{ backgroundColor: "lightgrey" }}
                component={RouterLink}
                to="/vouchers"
              >
                Edit Vouchers
              </Button>
            </div>
            <div style={{ margin: "15px" }}>
              <Button
                classes={{ label: "admin-components" }}
                variant="contained"
                color="primary"
                size="small"
                component={RouterLink}
                to="/adminitems"
                style={{ backgroundColor: "lightgrey" }}
              >
                Edit Category Page
              </Button>
            </div>
          </div>
        </div>
        {/* <AdminForm /> */}
      </div>
    );
  }
}

export default Admin;
