import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import Navbar2 from '../../components/navbar2/navbar2.js'
import { base } from '../../base.js'
import firebase from 'firebase'


import './main.scss'

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef()
  state = {calendarWeekends: true} // The rest of state is obtained through firebase call


  getCalDetails() {
    base.fetch("calendar/", {
      context: this,
      then(data) {
        this.setState({calendarEvents: data});
      }
    });
  }

  updateFirebase = (caldetails) => {
    // var caldetails = this.state
    var newCalKey = firebase.database().ref().child('calendar').push().key;
    var updates = {}
    updates['/calendar/' + newCalKey] = caldetails
    return firebase.database().ref().update(updates)
  }

  componentWillMount(){
    this.getOrders()
}

  // Reads data from firebase as an object
  // Can try to clean up this data, super messy in this form
  getOrders(){
      base.fetch('calendar', {
          context: this,
          asArray: true,
          then(data){
              console.log(data)
              this.setState({calendarEvents: data})
          }
      })
  }

  render() {

    let data = [{
      value: '9am - 12pm',
    }, {
      value: '12pm - 3pm',
    }, {
      value: '3pm - 6pm',
    }, {
      value: '6pm - 9pm'
    }];

    console.log(this.state)
    return (
      <div className='demo-app'>
        {/* {//<Navbar2/> } */}

        <div className='demo-app-calendar'>
        
          <FullCalendar
            
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            events={ this.state.calendarEvents }
            dateClick={ this.handleDateClick }
            />

        </div>


        {/* <Dropdown
        label='time'
        var data ={data}
        /> */}
      </div>

      
      
    )
  }


  handleDateClick = (arg) => {
    if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        var title = window.prompt("Enter the title");
        var starttime = window.prompt("Enter the start time");
        var endtime = window.prompt("Enter the end time");
        var calUpdate = {
          title: title,
          start:arg.dateStr + 'T' + starttime,
          end: arg.dateStr + 'T' + endtime
        }
        this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat(calUpdate) // creates a new array
      })
        this.updateFirebase(calUpdate)
    }
  }

  

}