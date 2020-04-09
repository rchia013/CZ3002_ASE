import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { firebaseapp, base } from '../../base.js'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import emailjs from 'emailjs-com'
import Calendar from '../calendar/calendar.jsx'
import Navbar2 from '../../components/navbar2/navbar2.js'
import { makeStyles, Grid, TextField, Paper } from '@material-ui/core';
import './Confirmation.css' 

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// This component receives Props (aka variables/state) from previous page(Wasteitem)
// It prints the state from the previous page, passed through the Link from react-router
// Authentication to firebase is done in base.js

class Confirmation2 extends Component{
    
    // State for Confirmation depends on props passed from Wasteitem
    state = { confirmdialog: false, loading: true  }
    

    // This runs when component mounts (basically when it appears on the page
    componentDidMount(){
        // Sets state of Confirmation to be the same as props passed in from Wasteitem
        this.setState(
            this.props.location.state
        )
        this.wasteRef = base.syncState('waste', {
            context: this,
            state: 'waste'
        })

        this.checkStatus()
    }

    componentWillUnmount(){
        base.removeBinding(this.wasteRef)
    }


    // Send update to firebase
    // Can also be tweaked to include completion callback
    updateFirebase = () => {

        // Handling user details
        var user_email = this.state.user.email
        var user_id = this.state.user.uid
        var user_name = this.state.user.displayName
        

        // Removing unnecessary info
        delete this.state.user
        delete this.state.userDetails
        delete this.state.tab

        var orderdetails = this.state
        var newOrderKey = firebase.database().ref().child('orders').push().key;
        console.log(orderdetails)
        var updates = {}
        updates['/orders/' + user_id + '/' + newOrderKey] = orderdetails
        // Firebase updated

        // Sending confirmation email
        const templateParams = {
            to_name: user_name,
            order_id: newOrderKey,
            to_email: user_email
        };
        emailjs.send('gmail','template_8MKL7Ui0_clone', templateParams, 'user_v3HTSBe6LX8JIwU6pC5w0')

        this.setState({ confirmdialog: true })
        return firebase.database().ref().update(updates)
    }

    

    checkStatus() {
        firebaseapp.auth().onAuthStateChanged((user) => {
                if (user!=null) {
                    this.setState({ user: user, name: user.displayName, id: user.uid, loading: false });
                } else {
                    this.setState({ user: null, loading: false });
          }
        });

    }

    handleConfirmClose = (e, reason) => {
        if (reason === "clickaway") {
          return;
        }
        this.setState({ confirmdialog: false });
      };
    

  render(){
    // console.log is useful for debugging, you can see it update in Chrome under Inspect Element > Console
    console.log(this.state)
    console.log(this.state.userDetails)
    
    return(
        <div>
            <Navbar2/>
            {(this.state.loading)? null :
            <div class="confirmation_page">  
                <div class="confirmation_content">
                <Grid
                className="Checkout"
                container
                direction="column"
                justify="flex-start"
                alignItems="center">
                    
                    <Grid 
                    container 
                    className="orderGrid"
                    direction="column"
                    justify="right"
                    alignItems="center"
                    spacing={3}>
                        <Grid className="orderGrid_item" item>
                        <Paper className="paperback">
                            <h3>GreenCart</h3>
                            {((this.state['Plastic Bottles']==0) || (this.state['Plastic Bottles']!=null))?<p>No of Plastic Bottles: {this.state['Plastic Bottles']}</p>:null}
                            {((this.state['Plastic Bag']!=null) || (this.state['Plastic Bag']!=null))?<p>No of Plastic Bags: {this.state['Plastic Bag']}</p>:null}                
                            {((this.state['Shampoo Bottles']!=null) || (this.state['Shampoo Bottles']!=null))?<p>No of Shampoo Bottles: {this.state['Shampoo Bottles']}</p>:null}
                            {((this.state['Batteries']!=null) || (this.state['Batteries']!=null))?<p>No of Batteries: {this.state['Batteries']}</p>:null}
                            {((this.state['Phones']!=null) || (this.state['Phones']!=null))?<p>No of Phones: {this.state['Phones']}</p>:null}
                            {((this.state['Computer']!=null) || (this.state['Computer']!=null))?<p>No of Computers: {this.state['Computer']}</p>:null}
                            {((this.state['Mason Jar']!=null) || (this.state['Mason Jar']!=null))?<p>No of Mason Jars: {this.state['Mason Jar']}</p>:null}
                            {((this.state['Glass Bottles']!=null) || (this.state['Glass Bottles']!=null))?<p>No of Glass Bottles: {this.state['Glass Bottles']}</p>:null}
                            {((this.state['Light Bulb']!=null) || (this.state['Light Bulb']!=null))?<p>No of Light Bulb: {this.state['Light Bulb']}</p>:null}
                            {((this.state['Florescent Tubes']!=null) || (this.state['Florescent Tubes']!=null))?<p>No of Florescent Tubes: {this.state['Florescent Tubes']}</p>:null}
                            {((this.state['Fairy Lights']!=null) || (this.state['Fairy Lights']!=null))?<p>No of Fary Lights: {this.state['Fairy Lights']}</p>:null}
                            {(this.state.points!=null)?<p>Total points: {this.state.points}</p>:null}
                            {(this.state.weight!=null)?<p>Total weight: {this.state.weight}kg</p>:null}
                            <br />
                            {(this.state.selfrecycle==true)? null:
                            <div>
                                <p>Name: {this.state.name}</p>
                                <p>Contact No: {this.state.phone}</p>
                                <p>Address: {this.state.address}</p>
                                <p>ZIP: S{this.state.zip}</p>
                                <p>Date: {this.state.calendarEvents.start.substr(0, this.state.calendarEvents.start.indexOf("T"))}</p>
                                <p>Start: {this.state.calendarEvents.start.substr(this.state.calendarEvents.start.indexOf("T") + 1)}</p>
                                <p>End: {this.state.calendarEvents.end.substr(this.state.calendarEvents.end.indexOf("T") + 1)}</p>
                            </div>}
                            {/* <p><small>Note that minimum of 10kg is required for scheduled orders</small></p> */}
                        </Paper>
                        </Grid>
                        <Grid item>
                            <Button 
                                className="confirm_btn"
                                variant="contained" color="primary" size="large" color="auto" 
                                onClick={() => this.updateFirebase()}>
                                Confirm!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                                


                <Dialog
                  open={this.state.confirmdialog}
                  onClose={this.handleConfirmClose}
                  aria-labelledby="edit-particulars-dialog"
                >
                  <DialogTitle id="edit-particulars-dialog">
                    Confirm
                  </DialogTitle>
                  <DialogContent id="edit-particulars-dialog">
                    <DialogContentText>
                      Success! A confirmation email has been sent to your registered
                      email account.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions id="edit-particulars-dialog">
                    <Button onClick={this.handleConfirmClose} color="primary" component={RouterLink} to="/">
                      OK
                    </Button>
                  </DialogActions>
                </Dialog>

                </div>
            </div>}
        </div>
    );
    }
}

export default Confirmation2;
