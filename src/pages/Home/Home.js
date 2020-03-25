import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Home.css";
import { firebaseapp } from "../../base.js";
import Navbar from "../../components/navbar/Navbar.js";

// This is a class based component (forgot what it's proper name is called). The other option is
// a functional component. Class based components offer more flexibility though.
var loginStatus2=false;
class Home extends Component {
  // Functions/Methods, if any, go here. See other pages for example
  state ={ user: null }
  
  // Checks status and adds user to state
  checkStatus() {
    firebaseapp.auth().onAuthStateChanged((user) => {
			if (user!=null) {
        this.setState({ user: user });
			} else {
				this.setState({ user: null });
      }
    });
  }

  componentDidMount(){
    this.checkStatus()
  }

  render() {
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
            <ul>
              <li>
                <div class="section_content">
                  <h1>Plastic</h1>
                  <p>Recycle used bottles and containers!</p>
                  <p><small>Scroll right to see more!</small></p>
                </div>
              </li>
              <li>
                <div class="section_content">
                  <h1>What can you recycle?</h1>
                  <p>Plastic bottles, containers and anything in between!</p>
                  <p>Just be sure to clean them thoroughly first for proper recycling!</p>
                </div>
              </li>
            </ul>
          </section>

          <section id="ewaste">
            <ul>
              <li>
                <div class="section_content">
                  <h1>E-waste</h1>
                  <p>Recycle batteries and used computers!</p>
                  <p><small>Scroll right to see more!</small></p>
                </div>
              </li>
              <li>
                <div class="section_content">
                  <h1>What can you recycle?</h1>
                  <p>Batteries, TVs, laptops and many more!</p>
                  <p>For bulky items, we recommend scheduling a pickup. Our experts will
                      handle the rest!
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section id="letsgo">
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink} 
              to={{
                  pathname:'/waste-items', 
                  state: {selfrecycle: false} 
              }}
            >
              Let's Go!
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/onemap"
            >
              Self-Recycle
            </Button>
            
            
           
          </section>
          <section id="profile_details">
            <h1>Profile Details</h1>
            <p>
              {(this.state.user!=null) ? (
                  <div>
                    <p> Logged in as {this.state.user.displayName}</p>
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
                      onClick={() => firebaseapp.auth().signOut()}
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
