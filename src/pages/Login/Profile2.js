import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import { Redirect } from "react-router";
import Admin from "../admin/admin.js";
import Navbar from "../../components/navbar/Navbar";
import './Profile2.css'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid, TextField, Paper } from '@material-ui/core';

import Table from 'react-bootstrap/Table'



var firebase = require("firebase");
var loginStatus = false;

class Profile2 extends Component {
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
        this.getUserOrders()
        this.getUserDetails()
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

  getUserDetails(){
    base.fetch("users" + this.state.user.uid + "/", {
      context: this,
      //asArray: true,
      then(data) {
        if (data != null){
          this.setState({ userDetails: data, address: data.address,
                          zip: data.zip, phone: data.phone });
        }
      }
    });
  }


  // For editing particulars
  handleTextChange = input => e => {
      this.setState({[input]: e.target.value})
  }


  handleClickOpen = e => {
    this.setState({dialog: true})
  }

  handleClose = e =>  {
    if(this.state.userDetails!=null){
      this.setState({ dialog: false, address: this.state.userDetails.address,
                      zip: this.state.userDetails.zip, phone: this.state.userDetails.phone });
    } 
    else {
      this.setState({ dialog: false, address: "",
        zip: "", phone: "" });
    }
  };

  // Updates user details to firebase database
  handleSubmitandClose = e => {
      
      var userDetailsUpdate = {
        address: this.state.address,
        zip: this.state.zip,
        phone: this.state.phone
      }
      var updates = {}
      updates[ 'users/' + this.state.user.uid + '/' ] = userDetailsUpdate

      this.setState({ dialog: false, userDetails: userDetailsUpdate })

      return firebase.database().ref().update(updates)
  }
    

  render() {
    console.log(this.state)
    

    // Table rows
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
      var listItems2 = (<p>Nothing yet</p>);
    }

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
      <div >
        <div class="profile_navbar"><Navbar /></div>
        {this.state.admin ? (
          <div class="admin_content">
            <Admin />
          </div>
        ) : (
          <div class="profile_page">
          <div class="profile_content">
            <section class="user">
              {(this.state.user!=null) ? 
              (<div class="user_welcome">
                <h1>Welcome {this.state.user.displayName}</h1>
                <Paper className="particulars-paper">
                    <h3>My Particulars</h3>
                    {(this.state.userDetails!=null)?<p>Address: {this.state.userDetails.address}</p>:<p>Address: Nothing yet!</p>}
                    {(this.state.userDetails!=null)?<p>ZIP Code: S{this.state.userDetails.zip}</p>:<p>ZIP Code: Nothing yet!</p>}                
                    {(this.state.userDetails!=null)?<p>Phone: {this.state.userDetails.phone}</p>:<p>Phone: Nothing yet!</p>}
                    {(this.state.userDetails!=null)?<p>Total points: {this.state.userDetails.points}</p>:<p>Total points: Nothing yet!</p>}
                </Paper>
                <Button
                  variant="contained"
                  color="auto"
                  size="large"
                  onClick={this.handleClickOpen}
                >
                  Edit Particulars
                </Button>    
                <p><small>Scroll down to see Order History</small></p>
              </div>) 
              : (<h1>Currently not logged in</h1>)}
              
                <Dialog open={this.state.dialog} onClose={this.handleClose} aria-labelledby="edit-particulars-dialog">
                    <DialogTitle id="edit-particulars-dialog">Edit Particulars</DialogTitle>
                    <DialogContent id="edit-particulars-dialog">
                        <DialogContentText>
                            Enter your particulars
                        </DialogContentText>
                        <TextField className="edit-particulars" id="address" label="Address" variant="outlined" margin="normal" 
                            value={this.state.address} 
                            onChange={this.handleTextChange("address")} />
                        <TextField className="edit-particulars" id="zip" label="ZIP Code" variant="outlined" margin="normal"
                            value={this.state.zip} 
                            onChange={this.handleTextChange("zip")} />
                        <TextField className="edit-particulars" id="phone" label="Contact No" variant="outlined" margin="normal" 
                            value={this.state.phone} 
                            onChange={this.handleTextChange("phone")} />
                    </DialogContent>
                    <DialogActions id="edit-particulars-dialog">
                      <Button onClick={this.handleClose} color="primary">
                          Cancel
                      </Button>
                      <Button onClick={this.handleSubmitandClose} color="primary">
                          Confirm
                      </Button>
                    </DialogActions>
                  </Dialog>
            </section>
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
          </div>
        )}

        
        
        
        

      </div>
    );
  }
}

// Remember to export so that you can use this component elsewhere
export default Profile2;
