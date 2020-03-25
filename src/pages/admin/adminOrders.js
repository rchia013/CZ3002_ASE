import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import './adminOrders.css'


import Table from 'react-bootstrap/Table'



var firebase = require("firebase");

class adminOrders extends Component {
  state = {
    admin: null,
    user: null,
    dialog: false,
    orderdata: []
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
        console.log("got orders")

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
        this.setState({ userdata: data} );

        
          var userList = data
          if (userList!=null){
            console.log("getting userdata")
            console.log(userList.length)
            for(var i=0; i<userList.length; i++){
              console.log(i)
              this.getUserOrders(userList[i].key)
            }
          }
      }
    })
  }
    

  getUserOrders(arg) {
    base.fetch("orders/" + arg, {
      context: this,
      asArray: true,
      then(data) {
        var updatedorderdata = this.state.orderdata.concat(data)
        console.log('orderdata')
        console.log(updatedorderdata)
        this.setState({ orderdata: updatedorderdata });
      }
    });
  }

  render() {
    console.log(this.state)

    // Table rows
    var userOrders = this.state.orderdata
    if (userOrders!=null){
      var listItems2 = (
        <tbody>
            {userOrders.map((d) => <tr>
              <td>{d.name}</td>
              <td>{d['Plastic Bottles']}</td>
              <td>{d['Plastic Bag']}</td>
              <td>{d['Shampoo Bottles']}</td>
              <td>{d['Batteries']}</td>
              <td>{d['Phones']}</td>
              <td>{d['Computer']}</td>
              <td>{d['Mason Jar']}</td>
              <td>{d['Glass Bottles']}</td>
              <td>{d['Light Bulb']}</td>
              <td>{d['Florescent Tubes']}</td>
              <td>{d['Fairy Lights']}</td>
              <td>{d['points']}</td>
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
      <div class="admin_userorder">
            <section class="orderHistory">
              <h2>Order History</h2>
              <Table class="ordertable" striped bordered hover variant="dark" responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Plastic Bottles</th>
                    <th>Plastic Bag</th>
                    <th>Shampoo Bottles</th>
                    <th>Batteries</th>
                    <th>Phones</th>
                    <th>Computer</th>
                    <th>Mason Jar</th>
                    <th>Glass Bottles</th>
                    <th>Light Bulb</th>
                    <th>Florescent Tubes</th>
                    <th>Fairy Lights</th>
                    <th>Points</th>
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
