import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { base } from '../../base.js'
import firebase from 'firebase'
import Tooltip from '@material-ui/core/Tooltip';


 
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
      this.setState({calendarEvents: [this.props.calEvents]})
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

  // eventRender() {
  //   var tooltip = new Tooltip(info.el, {
  //     title: info.event.extendedProps.description,
  //     placement: 'top',
  //     trigger: 'hover',
  //     container: 'body'
  //   });
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

        <div className='demo-app-calendar'>
        
          <FullCalendar
            
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            //ref={ this.calendarComponentRef }
            weekends={ this.state.calendarWeekends }
            events={ this.state.calendarEvents }
            dateClick={ this.props.handleUpdate }
            />
            
            

        </div>
        
        <form onSubmit={this.handleSubmit}>
        <label>
          Choose a Time:
          <select value={this.state.value} onChange={this.handleChange}>          
            <option value="9:00:00">9am-12pm</option>
            <option value="12:00:00">12pm-3pm</option>
            <option value="15:00:00">3pm-6pm</option>
            <option value="18:00:00">6pm-9pm</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
        </form>
        


      </div>

      
      
    )
  }


  handleDateClick = (arg) => {
    if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
        var title = window.prompt("Enter the title")
        var starttime = window.prompt("Enter the start time")
        var intStarttime = parseInt(starttime);
        var intEndtime = intStarttime + 3;
        var endtime = intEndtime.toString();
        var calUpdate = {
          title: title,
          start:arg.dateStr + 'T' + starttime + ":00:00",
          end: arg.dateStr + 'T'  +  endtime + ":00:00" ,
        }
        this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat(calUpdate) // creates a new array
      })
        this.updateFirebase(calUpdate)
    }
  }



  

}