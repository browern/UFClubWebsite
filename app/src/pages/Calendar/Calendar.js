import React from 'react';
//Imports calendar
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
//Localizer for calendar to keep track of time
import moment from 'moment';
//Styling for calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Setups the localizer by providing the moment object
const localizer = momentLocalizer(moment)

// Where events are stored in DATE format
const events = [
  //single event named "test"
  {
    start: moment("2024-11-01 01:00:00").toDate(),
    end: moment("2024-11-01 04:00:00").toDate(),
    title: "test",
  }

];

//Defines the main calendar and its functionallity
export default function EventCalendar() {
  return <Calendar
  events={events}
  localizer={localizer}
  views={['month', 'week', 'day']}
  style = {{height: 600, width: '60%'}} />
}; 