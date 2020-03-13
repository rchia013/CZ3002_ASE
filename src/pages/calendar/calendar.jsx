import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
//import { Dropdown } from 'react-native-material-dropdown';

import './main.scss'

export default class DemoApp extends React.Component {
  calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true, 
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() }, 
      {
          title: 'My birthday',
          start: '2020-03-02T10:00:00',
          end: '2020-03-02T12:00:00'
      }

    ]
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
    return (
      <div className='demo-app'>
        {/* <Navbar/> */}

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
        this.setState({  // add new event data
        calendarEvents: this.state.calendarEvents.concat({ // creates a new array
          title: title,
          start:arg.dateStr + 'T' + starttime,
          end: arg.dateStr + 'T' + endtime
        })
      })
    }
  }

  

}