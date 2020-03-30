import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { firebaseapp, base } from '../base.js'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import emailjs from 'emailjs-com'
import Calendar from './calendar/calendar.jsx'
import Navbar2 from './../components/navbar2/navbar2.js'
import { makeStyles, Grid, TextField, Paper } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import './Confirmation.css' 

// This component receives Props (aka variables/state) from previous page(Wasteitem)
// It prints the state from the previous page, passed through the Link from react-router
// Authentication to firebase is done in base.js

class Confirmation extends Component{
    
    // State for Confirmation depends on props passed from Wasteitem
    state = { calendarEvents: null, address: "", zip: "", phone: ""  }
    

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

    submissionCondition(){
        // Condition checking for scheduled pickups
        if (this.state.user==null){
            return false

        // Self recycle selected, or weight requirement not met
        } else if ((this.state.selfrecycle==true)||(this.state.weight<10)){
            return true
        }
        // No date, address, phone or zip
        else if ((this.state.calendarEvents==null)||(this.state.address=="") || (this.state.phone=="") || (this.state.zip==""))
            return false
        else{
            return true
        }
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
        return firebase.database().ref().update(updates)
    }

    // Handles user particulars
    getUserDetails(){
        console.log("fetching user details")
        base.fetch("users/" + this.state.user.uid , {
            context: this,
            //asArray: true,
            then(data) {
              if (data != null){
                this.setState({ userDetails: data });
              }
            }
          });
    }

    appendDetails(address, zip, phone) {
        this.setState({ address: address,
                        zip: zip,
                        phone: phone })
    }

    checkStatus() {
        firebaseapp.auth().onAuthStateChanged((user) => {
                if (user!=null) {
                    this.setState({ user: user, name: user.displayName, id: user.uid });
                    this.getUserDetails()
                } else {
                    this.setState({ user: null });
          }
        });

    }


    // Function passed to Calendar component
    getCalUpdate = (arg) => {
        if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            // var title = window.prompt("Enter the title");
            var title = "Schedule pickup"
            var starttime = window.prompt("Enter the start time(HH:MM:SS)");
            var endtime = window.prompt("Enter the end time(HH:MM:SS)");
            var calUpdate = {
                title: title,
                start:arg.dateStr + 'T' + starttime,
                end: arg.dateStr + 'T' + endtime
            }
            this.setState({  
                calendarEvents: calUpdate // add new event data
            })
        }
    }

    handleTextChange = input => e => {
        this.setState({[input]: e.target.value})
    }

  render(){
    // console.log is useful for debugging, you can see it update in Chrome under Inspect Element > Console
    console.log(this.state)
    console.log(this.state.userDetails)
    
    return(
        <div>
            <Navbar2/>
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
                            {/* <p><small>Note that minimum of 10kg is required for scheduled orders</small></p> */}
                        </Paper>
                        </Grid>

                        {((this.state.selfrecycle==true)||(this.state.weight<10)) ? null :
                            <Grid className="orderGrid_item" item>
                            <Paper className="paperback">
                                <form>
                                    <h3> Schedule Pickup Details </h3>
                                <TextField className="schedule-form" id="address" label="Address" 
                                            variant="outlined" margin="normal" value={this.state.address}
                                            onChange={this.handleTextChange("address")} />
                                <TextField className="schedule-form" id="zip" label="ZIP Code" 
                                            variant="outlined" margin="normal" value={this.state.zip}
                                            onChange={this.handleTextChange("zip")} />
                                <TextField className="schedule-form" id="phone" label="Contact No" 
                                            variant="outlined" margin="normal" value={this.state.phone}
                                            onChange={this.handleTextChange("phone")} />
                                </form>
                                {((this.state.userDetails==null) ||  (Object.entries(this.state.userDetails).length<=1))?
                                <Button className="append-user-details" variant="contained" 
                                    color="primary" size="large" color="auto" disabled>
                                    Cant Use my details
                                </Button>
                                :
                                <Button className="append-user-details" variant="contained" 
                                    color="primary" size="large" color="auto"
                                    onClick={() => this.appendDetails(this.state.userDetails.address,
                                                    this.state.userDetails.zip, this.state.userDetails.phone)}>
                                    Use my details
                                </Button>
                                }
                            </Paper>
                            </Grid>}

                        <Grid item
                        >
                        {(this.submissionCondition()) ?

                            (((this.state.weight<10) && (this.state.selfrecycle==false)) ?
                                // Case where weight <10, display onemap
                                <Button 
                                    className="confirm_btn"
                                    variant="contained" color="primary" size="large" color="auto" 
                                    onClick={() => this.updateFirebase()}
                                    component={RouterLink} to={{ pathname:"/onemap", state: {displayselfrecycle:false} }}>
                                    Confirm!
                                </Button>:
                                <Button 
                                    className="confirm_btn"
                                    variant="contained" color="primary" size="large" color="auto" 
                                    onClick={() => this.updateFirebase()}
                                    component={RouterLink} to="/">
                                    Confirm!
                                </Button>) :

                        <Button 
                            className="confirm_btn"
                            variant="contained" color="primary" size="large" color="auto" 
                            disabled>
                            Confirm!
                        </Button>}

                        </Grid>
                    </Grid> 
                </Grid>
                {((this.state.selfrecycle==true)||(this.state.weight<10)) ? null : 
                <Grid className="calendarGrid" xs = {12}>
                <Calendar calEvents={this.state.calendarEvents} handleUpdate={this.getCalUpdate}/>
                </Grid>}



                </div>
            </div>
        </div>
    );
    }
}

export default Confirmation;
