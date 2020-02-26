import React, { Component } from 'react';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import AppBar from '@material-ui/core/AppBar'
import TextField from '@material-ui/core/TextField'
import './Wasteitem.css'
import { Grid } from '@material-ui/core';

class Wasteitem extends Component{

    // This is a state that holds the current values of variables we are interested in.
    // In this case, they are count for plastic bottles and batteries
    state = {
        plastic_bottle: '',
        batteries: ''
    }
    
    // Handle Change to text fields
    // Honestly not entirely clear how this works, but I believe it's the handleChange('[input]')
    // which determines which fields are updated in props. Something like that :)
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    

  render(){
    const { currentstate } = this.state
    
    return(
        <div class="waste_item_content">
            {/* MuiThemeProvider only accepts one element, so everyting is wrapped in a div*/}
            <MuiThemeProvider>
            <div>
                {/* Material UI comes with an AppBar, but I'm not sure if you can use it across
                multiple pages */}
                <AppBar title="Select stuff you want to dispose!"/>
                
                {/* Grid is used for formatting */}
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center">
                <TextField class="textFields"
                    style={{ margin: 8, width: 200 }}
                    size='medium'
                    type="number"
                    placeholder="Enter quantity"                   
                    helperText="Plastic Bottles"
                    onChange={this.handleChange('plastic_bottle')} />

                <TextField class="textFields"
                    style={{ margin: 8, width: 200 }}
                    size='medium'
                    type="number"
                    placeholder="Enter quantity"
                    helperText="Batteries"
                    onChange={this.handleChange('batteries')} /> 

                </Grid>

                {/* This is just to illustrate props and setting of state
                    State isn't saved when browsing to another page i.e. quantities will reset
                    Holding information on previous state should be possible but I think it's
                    quite difficult. */}

                <p>No of bottles: {this.state.plastic_bottle}</p>
                <p>No of batteries: {this.state.batteries}</p>

                {/* This button serves as a link, uses react-router 
                    Uses react-router {Link} to:Object,
                    sets pathname to '/Confirmation' (see App.js for Router Switch implementation)
                    and passes the current state to the next component (i.e. Confirmation) */}
                <div class="confirm_button">
                    <Button 
                        variant="contained" color="primary" size="large" 
                        component={RouterLink} 
                        to={{
                            pathname:'/Confirmation', 
                            state: this.state
                        }}>
                        Proceed!
                    </Button>
                </div>
            </div>
            </MuiThemeProvider>
        </div>
    );
    }
}

export default Wasteitem;
