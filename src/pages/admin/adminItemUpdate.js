import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import './adminItemUpdate.css'

import { Grid, Paper, TextField } from '@material-ui/core';



var firebase = require("firebase");

class adminItemUpdate extends Component {
  state = { ['Batteries Points']: 0,
            ['Batteries Weight']: 0,
            ['Computer Points']: 0,
            ['Computer Weight']: 0,
            ['Fairy Lights Points']: 0,
            ['Fairy Lights Weight']: 0,
            ['Florescent Tubes Points']: 0,
            ['Florescent Tubes Weight']: 0,
            ['Glass Bottles Points']: 0,
            ['Glass Bottles Weight']: 0,
            ['Light Bulb Points']: 0,
            ['Light Bulb Weight']: 0,
            ['Mason Jar Points']: 0,
            ['Mason Jar Weight']: 0,
            ['Phones Points']: 0,
            ['Phones Weight']: 0,
            ['Plastic Bag Points']: 0,
            ['Plastic Bag Weight']: 0,
            ['Plastic Bottles Points']: 0,
            ['Plastic Bottles Weight']: 0,
            ['Shampoo Bottles Points']: 0,
            ['Shampoo Bottles Weight']: 0
  }

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
        this.getItems()
        console.log("got item data")

      } else {
        this.setState({ user: null });
      }
    });
  }

  componentDidMount() {
    this.checkStatus()
  }


  getItems() {
    base.fetch("items/", {
      context: this,
      then(data) {
        this.setState({ ['Batteries Points']: data['Batteries Points'],
                        ['Batteries Weight']: data['Batteries Weight'],
                        ['Computer Points']: data['Computer Points'],
                        ['Computer Weight']: data['Computer Weight'],
                        ['Fairy Lights Points']: data['Fairy Lights Points'],
                        ['Fairy Lights Weight']: data['Fairy Lights Weight'],
                        ['Florescent Tubes Points']: data['Florescent Tubes Points'],
                        ['Florescent Tubes Weight']: data['Florescent Tubes Weight'],
                        ['Glass Bottles Points']: data['Glass Bottles Points'],
                        ['Glass Bottles Weight']: data['Glass Bottles Weight'],
                        ['Light Bulb Points']: data['Light Bulb Points'],
                        ['Light Bulb Weight']: data['Light Bulb Weight'],
                        ['Mason Jar Points']: data['Mason Jar Points'],
                        ['Mason Jar Weight']: data['Mason Jar Weight'],
                        ['Phones Points']: data['Phones Points'],
                        ['Phones Weight']: data['Phones Weight'],
                        ['Plastic Bag Points']: data['Plastic Bag Points'],
                        ['Plastic Bag Weight']: data['Plastic Bag Weight'],
                        ['Plastic Bottles Points']: data['Plastic Bottles Points'],
                        ['Plastic Bottles Weight']: data['Plastic Bottles Weight'],
                        ['Shampoo Bottles Points']: data['Shampoo Bottles Points'],
                        ['Shampoo Bottles Weight']: data['Shampoo Bottles Weight'] });
      }
    })
  }
    
  updateFirebase = () => {
    delete this.state.user
    delete this.state.admin
    var itemdetails = this.state
    var updates = {}
    updates['/items/'] = itemdetails
    // Firebase updated

    return firebase.database().ref().update(updates)
  }

  handleTextChange = input => e => {
    // itemdetails[input] = e.target.value
    this.setState({[input]: e.target.value})
  }


  render() {
    console.log(this.state)

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
        <div class="admin-item-container">
          <Grid
                className="admin-items"
                container
                direction="column"
                justify="flex-start"
                alignItems="center">

            <Paper elevation={2}>
            <TextField id="Plastic Bottles Weight" label="Plastic Bottles Weight" value={this.state['Plastic Bottles Weight']} 
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Plastic Bottles Weight")}/>
            <TextField id="Plastic Bottles Points" label="Plastic Bottles Points" value={this.state['Plastic Bottles Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Plastic Bottles Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Plastic Bag Weight" label="Plastic Bag Weight" value={this.state['Plastic Bag Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Plastic Bag Weight")}/>
            <TextField id="Plastic Bag Points" label="Plastic Bag Points" value={this.state['Plastic Bag Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Plastic Bag Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Shampoo Bottles Weight" label="Shampoo Bottles Weight" value={this.state['Shampoo Bottles Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Shampoo Bottles Weight")}/>
            <TextField id="Shampoo Bottles Points" label="Shampoo Bottles Points" value={this.state['Shampoo Bottles Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Shampoo Bottles Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Batteries Weight" label="Batteries Weight" value={this.state['Batteries Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Batteries Weight")}/>
            <TextField id="Batteries Points" label="Batteries Points" value={this.state['Batteries Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Batteries Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Phones Weight" label="Phones Weight" value={this.state['Phones Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Phones Weight")}/>
            <TextField id="Phones Points" label="Phones Points" value={this.state['Phones Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Phones Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Computer Weight" label="Computer Weight" value={this.state['Computer Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Computer Weight")}/>
            <TextField id="Computer Points" label="Computer Points" value={this.state['Computer Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Computer Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Mason Jar Weight" label="Mason Jar Weight" value={this.state['Mason Jar Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Mason Jar Weight")}/>
            <TextField id="Mason Jar Points" label="Mason Jar Points" value={this.state['Mason Jar Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Mason Jar Points")}/>
            </Paper>
            
            <Paper elevation={2}>
            <TextField id="Glass Bottles Weight" label="Glass Bottles Weight" value={this.state['Glass Bottles Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Glass Bottles Weight")}/>
            <TextField id="Glass Bottles Points" label="Glass Bottles Points" value={this.state['Glass Bottles Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Glass Bottles Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Light Bulb Weight" label="Light Bulb Weight" value={this.state['Light Bulb Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Light Bulb Weight")}/>
            <TextField id="Light Bulb Points" label="Light Bulb Points" value={this.state['Light Bulb Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Light Bulb Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Florescent Tubes Weight" label="Florescent Tubes Weight" value={this.state['Florescent Tubes Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Florescent Tubes Weight")}/>
            <TextField id="Florescent Tubes Points" label="Florescent Tubes Points" value={this.state['Florescent Tubes Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Florescent Tubes Points")}/>
            </Paper>

            <Paper elevation={2}>
            <TextField id="Fairy Lights Weight" label="Fairy Lights Weight" value={this.state['Fairy Lights Weight']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Fairy Lights Weight")}/>
            <TextField id="Fairy Lights Points" label="Fairy Lights Points" value={this.state['Fairy Lights Points']}
                variant="outlined" margin="normal"
                onChange={this.handleTextChange("Fairy Lights Points")}/>
            </Paper>

            <Button 
              className="confirm_btn"
              variant="contained" color="primary" size="large" color="auto" 
              onClick={() => this.updateFirebase()}>
              Confirm!
            </Button>
            <Button
                variant="contained"
                color="auto"
                size="large"
                component={RouterLink}
                to="/"
              >
            Home
          </Button>
          </Grid>
          

        </div>
      
    )
    }
}


// Remember to export so that you can use this component elsewhere
export default adminItemUpdate;
