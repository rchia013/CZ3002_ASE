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
        } else if (this.state.selfrecycle==true){
            return true
        }
        else if (this.state.calendarEvents==null){
            return false
        } else if ((this.state.address=="") || (this.state.phone=="") || (this.state.zip=="")){
            return false
        } else{
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
        base.fetch(this.state.user.uid + "/", {
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
        console.log(address)
        console.log(zip)
        console.log(phone)
        this.setState({ address: address,
                        zip: zip,
                        phone: phone })
    }

    checkStatus() {
        firebaseapp.auth().onAuthStateChanged((user) => {
                if (user!=null) {
                    this.setState({ user: user });
                    this.getUserDetails()
                } else {
                    this.setState({ user: null });
          }
        });

    }


    // Function passed to Calendar component
    getCalUpdate = (arg) => {
        if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
            var title = window.prompt("Enter the title");
            var starttime = window.prompt("Enter the start time");
            var endtime = window.prompt("Enter the end time");
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
        <div class="confirmation_page">
            
            {<Navbar2/> }      
            <div class="confirmation_content">
            <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            spacing={3}>
                
                <Grid item 
                className="orderGrid"
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center">
                <Paper className="paperback">
                    <h3>GreenCart</h3>
                    {(this.state.Plastic!=null)?<p>No of bottles: {this.state.Plastic}</p>:null}
                    {(this.state.Batteries!=null)?<p>No of batteries: {this.state.Batteries}</p>:null}                
                    {(this.state.Glass!=null)?<p>No of glass: {this.state.Glass}</p>:null}
                    {(this.state['E Waste']!=null)?<p>No of eWaste: {this.state['E Waste']}</p>:null}
                    {(this.state.points!=null)?<p>Total points: {this.state.points}</p>:null}
                </Paper>                
                </Grid>


                {this.state.selfrecycle ? null :
                    <Grid item 
                    className="orderGrid"
                    direction="column"
                    justify="center"
                    alignItems="left">
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
                        {(this.state.userDetails!=null)?
                        <Button className="append-user-details" variant="contained" 
                                color="primary" size="large" color="auto"
                                onClick={() => this.appendDetails(this.state.userDetails.address,
                                    this.state.userDetails.zip, this.state.userDetails.phone)}>
                            Use my details
                        </Button>:
                        <Button className="append-user-details" variant="contained" 
                                color="primary" size="large" color="auto" disabled>
                            Cant Use my details
                        </Button>}
                    </Paper>
                    </Grid>}
                

                {(this.submissionCondition())?
                <Button 
                    variant="contained" color="primary" size="large" color="auto" 
                    onClick={() => this.updateFirebase()}
                    component={RouterLink} to="/">
                    Confirm!
                </Button>:
                <Button 
                    variant="contained" color="primary" size="large" color="auto" 
                    disabled>
                    Confirm!
                </Button>}
            </Grid>

            {this.state.selfrecycle==true ? null :
            <Calendar calEvents={this.state.calendarEvents} handleUpdate={this.getCalUpdate}/>}

            </div>
        </div>
    );
    }
}

export default Confirmation;
