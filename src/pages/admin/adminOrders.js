import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";


import Table from 'react-bootstrap/Table'



var firebase = require("firebase");

class adminOrders extends Component {
  state = {
    admin: null,
    user: null,
    dialog: false
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
        this.getOrders()
      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.checkStatus()
  }


  getOrders() {
    base.fetch("orders/", {
      context: this,
      asArray: true,
      then(data) {
        this.setState({ orderdata: data} );
      }
    });
  }
    

  render() {
    console.log(this.state)
    

    // Table rows
    var temporders2 = this.state.orderdata
    console.log(temporders2)
    if (temporders2!=null){
      console.log(temporders2)
      var listItems2 = (
        <tbody>
            {temporders2.map((d) => <tr>
              <td>{d.key}</td>
              <td>{d.batteries}</td>
              <td>{d.plastic_bottle}</td>
              <td>{d.key.glass}</td>
            </tr>)}
        </tbody>)
    } else
    {
      var listItems2 = (<p>Nothing yet</p>);
    }

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
      <div class="profile_page">
            <section class="orderHistory">
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

            </section>
              
          </div>
        )
    }
}

// Remember to export so that you can use this component elsewhere
export default adminOrders;
