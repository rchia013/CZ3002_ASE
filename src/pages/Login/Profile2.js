import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import { Redirect } from "react-router";
import Admin from "../admin/admin.js";
import Navbar from "../../components/navbar/Navbar";
import './Profile2.css'

import Table from 'react-bootstrap/Table'



var firebase = require("firebase");
var loginStatus = false;

class Profile2 extends Component {
  state = {
    admin: null,
    user: null
  };

  // Checks status and adds user to state
  checkStatus() {
    firebaseapp.auth().onAuthStateChanged((user) => {
      if (user!=null) {
        this.setState({ user: user })

        // Dealing with admin
        firebaseapp.auth().currentUser.getIdTokenResult()
        .then(idTokenResult => {
          this.setState({
            admin: idTokenResult.claims.admin
          })
        })

        console.log("done setting state")
        this.getUserOrders()
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.checkStatus()
  }


  getUserOrders() {
    base.fetch("orders/" + this.state.user.uid, {
      context: this,
      asArray: true,
      then(data) {
        this.setState({ orderdata: data} );
      }
    });
  }

  render() {
    var temporders = [{"name": "test1"},{"name":"test2"}]
    
    
    const listItems = temporders.map((d) => <li key={d.name}>{d.name}</li>)
    
    
    var temporders2 = this.state.orderdata
    if (temporders2!=null){
      console.log(temporders2)
      var listItems2 = (
        <tbody>
            {temporders2.map((d) => <tr>
              <td>{d.key}</td>
              <td>{d.batteries}</td>
              <td>{d.plastic_bottle}</td>
              <td>{d.glass}</td>
            </tr>)}
        </tbody>)
    } else
    {
      var listItems2 = (<p>Nothing yet2</p>);
    }

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
      <div>
        <div class="profile_navbar"><Navbar /></div>
        {this.state.admin ? (
          <div class="admin_content">
            <Admin />
          </div>
        ) : (
          <div class="profile_content">
            <div class="user">
              {(this.state.user!=null) ? (<h1>Welcome {this.state.user.displayName}</h1>) 
                                     : (<h1>Currently not logged in</h1>)}
              <br />
              <div class="orderHistory">
                <h2>Order History</h2>
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Batteries</th>
                      <th>Plastic bottles</th>
                      <th>Glass</th>
                    </tr>
                  </thead>
                  {listItems2}
                </Table>
              </div>
              <div class="test_button">
                <Button
                  variant="contained"
                  // color="inherit"
                  size="large"
                  component={RouterLink}
                  to="/"
                >
                  Home
                </Button>
              </div>
            </div>
          </div>
        )}

        
        
        
        

      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Profile2;
