import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import Navbar2 from '../../components/navbar2/navbar2.js'
import { base } from '../../base.js'
import firebase from 'firebase'


import './main.scss'

export default class Calendar extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { calendarWeekends: true, calendarEvents:[]};
    // this.handleUpdate = this.handleUpdate.bind(this);
  }
  
  calendarComponentRef = React.createRef()
  // state = {calendarWeekends: true} // The rest of state is obtained through firebase call


  getCalDetails() {
    base.fetch("calendar/", {
      context: this,
      then(data) {
        this.setState({calendarEvents: data});
      }
    });
  }

  // updateFirebase = (caldetails) => {
  //   // var caldetails = this.state
  //   var newCalKey = firebase.database().ref().child('calendar').push().key;
  //   var updates = {}
  //   updates['/calendar/' + newCalKey] = caldetails
  //   return firebase.database().ref().update(updates)
  // }

  componentDidUpdate(prevProps){
    if (this.props.calEvents!=prevProps.calEvents){
      this.setState({calendarEvents: this.state.calendarEvents.concat(this.props.calEvents)})
      console.log("different")
    }
  }

  // Reads data from firebase as an object
  // Can try to clean up this data, super messy in this form
  // getOrders(){
  //     base.fetch('calendar', {
  //         context: this,
  //         asArray: true,
  //         then(data){
  //             console.log(data)
  //             this.setState({calendarEvents: data})
  //         }
  //     })
  // }

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

    // console.log(this.props)
    // console.log(this.state)
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
            dateClick={ this.props.handleUpdate }
            />

        </div>


        {/* <Dropdown
        label='time'
        var data ={data}
        /> */}
      </div>

      
      
    )
  }
  

}