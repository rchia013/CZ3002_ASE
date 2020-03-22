import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { firebaseapp, base } from '../base.js'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import emailjs from 'emailjs-com'
import { makeStyles, Grid, Container, Paper } from '@material-ui/core';
import { sizing } from '@material-ui/system';
import './Confirmation.css'

// This component receives Props (aka variables/state) from previous page(Wasteitem)
// It prints the state from the previous page, passed through the Link from react-router
// Authentication to firebase is done in base.js

class Confirmation extends Component{
    
    // State for Confirmation depends on props passed from Wasteitem
    state = {}

    


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
    }

    componentWillUnmount(){
        base.removeBinding(this.wasteRef)
    }

    // Send update to firebase
    // Can also be tweaked to include completion callback
    updateFirebase = () => {
        // Handling user auth
        var user = firebaseapp.auth().currentUser
        var user_email = user.email
        var user_id = user.uid
        var user_name = user.displayName

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

  render(){
    // console.log is useful for debugging, you can see it update in Chrome under Inspect Element > Console
    console.log(this.state)
    
    return(
        <div class="confirmation_page">

                {/* This is an example of how to print from this.state. 
                    Remember to wrap in {} when you do it. */}
                {/* <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
                spacing={3}> */}
                    
                    <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    spacing={3}>
                        
                        <Grid item 
                        className="orderGrid"
                        direction="column"
                        justify="left"
                        alignItems="left">
                        <Paper className="paperback">
                        <h3>GreenCart</h3>
                        {(this.state.Plastic!=null)?<p>No of bottles: {this.state.Plastic}</p>:null}
                        
                        {(this.state.Batteries!=null)?<p>No of batteries: {this.state.Batteries}</p>:null}
                        
                        
                        {(this.state.Glass!=null)?<p>No of glass: {this.state.Glass}</p>:null}
                        
                        {(this.state['E Waste']!=null)?<p>No of eWaste: {this.state['E Waste']}</p>:null}

                        {(this.state.points!=null)?<p>Total points: {this.state.points}</p>:null}
                        </Paper>
                        </Grid>
                        <Button 
                            variant="contained" color="primary" size="large"  
                            onClick={() => this.updateFirebase()}
                            component={RouterLink} to="/">
                            Confirm!
                        </Button>
                    </Grid>
                    
                    

                {/* </Grid>                 */}
                

                {/*<TextField class="textFields"
                    style={{ margin: 8, width: 200 }}
                    size='medium'
                    placeholder="Enter email"                   
                    helperText="Enter your email here!"
                    onChange={this.onChange} />*/}

                {/* This button serves as a link, uses react-router.
                    onClick runs this.updateFirebase (see above) which adds the info to the
                    Firebase database. I don't understand the syntax but something like this
                    works */}
                
        </div>
    );
    }
}

export default Confirmation;
