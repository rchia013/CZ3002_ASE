import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Home.css";
import app from "../../base.js";
import Navbar from "../../components/navbar/Navbar.js";
var firebase = require("firebase");

// This is a class based component (forgot what it's proper name is called). The other option is
// a functional component. Class based components offer more flexibility though.
var loginStatus;
class Home extends Component {
  // Functions/Methods, if any, go here. See other pages for example

  checkStatus() {
    var user = app.auth().currentUser;

    if (user) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    loginStatus = this.checkStatus();

    // Functions to be run should be put here. And other stuff that I'm probably not aware of.
    // Note that ComponentWillMount() etc will be above in the function area (see Wasteitem.js)
    // These special functions will, generally speaking, run before anything is loaded

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">

    return (
      <div class="home_content">
        {/*import Navbar as a component*/}
        <Navbar />

        {/* These are the sections that appear on the page. Smooth scrolling is implemented in CSS
                because everything else is too advanced for me. Removing CSS would just make it a
                normal webpage */}
        <section id="home">
          <h1>Welcome!</h1>
          <p>This is our webapp!</p>
        </section>

        <section id="plastic">
          <h1>Plastic</h1>
          <p>Recycle used bottles and containers!</p>
        </section>

        <section id="ewaste">
          <h1>E-waste</h1>
          <p>Recycle batteries and used computers!</p>
        </section>

        <section id="letsgo">
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/waste-items"
          >
            Let's Go!
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/categorypage"
          >
            Self-Recycle
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/map"
          >
            View Google Map
          </Button>
          <br />
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/onemap"
          >
            View Onemap
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/lightingcat"
          >
            View lightingcat
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/test"
          >
            View test
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/greenshoppingcart"
          >
            GreenShoppingCart
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={RouterLink}
            to="/calendar"
          >
            View Calendar
          </Button>
        </section>
        <section id="profile_details">
          <h1>Profile Details</h1>
          <p>
            {loginStatus ? (
              <div>
                <p> Logged in as {app.auth().currentUser.displayName}</p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/profile"
                >
                  View Profile
                </Button>

                <br />
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => app.auth().signOut()}
                  component={RouterLink}
                  to="/"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <p>Not logged in </p>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to="/login"
                >
                  Login
                </Button>
              </div>
            )}
          </p>
        </section>
      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Home;
