import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Home.css";
import { firebaseapp } from "../../base.js";
import Navbar from "../../components/navbar2/navbar2.js";

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

          <section id="glass">
            <ul>
              <li>
                <div class="section_content">
                  <h1>Glass</h1>
                  <p>Recycle any glass material!</p>
                  <p><small>Scroll right to see more!</small></p>
                </div>
              </li>
              <li>
                <div class="section_content">
                  <h1>What can you recycle?</h1>
                  <p>Glass jar, glass bottles and many more!</p>
                  <p>For any broken glass fragments, we recommend scheduling a pickup. Our experts will
                      handle the rest! For Self-recycling, we recommend recycling at any recycling bins nearest to you!
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section id="lighting">
            <ul>
              <li>
                <div class="section_content">
                  <h1>Lighting</h1>
                  <p>Recycle any lighting!</p>
                  <p><small>Scroll right to see more!</small></p>
                </div>
              </li>
              <li>
                <div class="section_content">
                  <h1>What can you recycle?</h1>
                  <p>Florescent Tubes, light bulbs, fairy lights and many more!</p>
                  <p>For multiple items with accumulative weight of more than 15kg, we recommend scheduling a pick up!
                  </p>
                </div>
              </li>
            </ul>
          </section>

          <section id="letsgo">
            <div class="letsgopage">
              <div class="schedulepickup">
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
                  Schedule Pick Up
                </Button>
              </div>
              <div class="selfrecycle">
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  component={RouterLink}
                  to={{
                    pathname:'/onemap', 
                    state: {selfrecycle: true} 
                }}
                >
                  Self-Recycle
                </Button>
              </div>
            </div>


            
            
           
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
