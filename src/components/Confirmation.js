import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { base } from '../base.js'
import firebase from 'firebase'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './Wasteitem.css'
import emailjs from 'emailjs-com'
import { EmailJSResponseStatus } from 'emailjs-com';

// This component receives Props (aka variables/state) from previous page(Wasteitem)
// It prints the state from the previous page, passed through the Link from react-router
// Authentication to firebase is done in base.js

class Confirmation extends Component{
    
    // State for Confirmation depends on props passed from Wasteitem
    state = {}

    //user_email= ''


    // This runs when component mounts (basically when it appears on the page
    componentDidMount(){
        // Sets state of Confirmation to be the same as props passed in from Wasteitem
        this.setState(
            this.props.location.state
        )
    }

    // Based on my experimenation, this seems to run more often? Some complicated shit going on here!
    // Something to do with react-app lifecycles
    componentWillMount(){
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
        var to_email = this.state.user_email
        delete this.state.user_email
        var orderdetails = this.state
        var newOrderKey = firebase.database().ref().child('orders').push().key;
        var updates = {}
        const templateParams = {
            to_name: 'Human',
            order_id: newOrderKey,
            to_email: to_email
        };
        updates['/orders/' + newOrderKey] = orderdetails
        emailjs.send('gmail','template_8MKL7Ui0_clone', templateParams, 'user_v3HTSBe6LX8JIwU6pC5w0')
        return firebase.database().ref().update(updates)
    }

    onChange = (e) => {
        this.setState({user_email: e.target.value})
      }


  render(){
    // console.log is useful for debugging, you can see it update in Chrome under Inspect Element > Console
    //console.log(this.state)

    return(
        <div class="confirmation_page">

                {/* This is an example of how to print from this.state. 
                    Remember to wrap in {} when you do it. */}                
                <p>No of bottles: {this.state.plastic_bottle}</p>
                <p>No of batteries: {this.state.batteries}</p>
                <p>Email: {this.state.user_email}</p>

                <TextField class="textFields"
                    style={{ margin: 8, width: 200 }}
                    size='medium'
                    placeholder="Enter email"                   
                    helperText="Enter your email here!"
                    onChange={this.onChange} />

                {/* This button serves as a link, uses react-router.
                    onClick runs this.updateFirebase (see above) which adds the info to the
                    Firebase database. I don't understand the syntax but something like this
                    works */}
                <div class="confirm_button">
                    <Button 
                        variant="contained" color="primary" size="large"  
                        onClick={() => this.updateFirebase()}
                        component={RouterLink} to="/">
                        Confirm!
                    </Button>
                </div>
        </div>
    );
    }
}

export default Confirmation;
