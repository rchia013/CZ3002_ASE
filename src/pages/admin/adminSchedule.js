import React, { Component } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseapp, base } from "../../base.js";
import './adminSchedule.css'
import Calendar from '../calendar/calendar.jsx'

import { Grid, Paper } from '@material-ui/core';



var firebase = require("firebase");

class adminSchedule extends Component {
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

    // Getting scheduled orders
    var userOrders = this.state.orderdata
    if ((userOrders!=null)||(Object.entries(userOrders).length!=0)){      
      var schedule = userOrders.map((d) => d.calendarEvents)
      console.log("schedule")
      console.log(schedule)

      // Removing nulls
      var filteredschedule = schedule.filter(function(el) { return el != null })
      var info = userOrders.map((d) => [d.key, d.name, d.address, d.zip, d.phone])
    }

    // Return is basically the html for whatever you want displayed.
    // Note that you can only return one html element, so in this case i wrapped everything in
    // <div class="home_content">
    return (
      <div class="admin_schedule_container">
            <section class="admin_schedule">
              <div class="header">
                <h2>Admin Schedule</h2>
              </div>

              <div class="calendar-container">
              <Grid className="admin_calendarGrid">
                <Calendar calEvents={filteredschedule} orderInfo={info}/>
              </Grid>
              </div>

              
              <div class="adminSchedule_home_btn">
                <Button
                  variant="contained"
                  color="auto"
                  size="large"
                  component={RouterLink}
                  to="/profile"
                >
                  Back
                </Button>
              </div>
            </section>
          </div>
        )
    }
}

// Remember to export so that you can use this component elsewhere
export default adminSchedule;
