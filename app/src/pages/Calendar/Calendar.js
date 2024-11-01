import React from 'react';
//Imports calendar
import { Calendar, CalendarProps, momentLocalizer } from 'react-big-calendar';
//Localizer for calendar to keep track of time
import moment from 'moment';
//Styling for calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './index.css';

// Referenced from: https://medium.com/@dhruvil_41022/how-to-make-reactjs-calendar-with-events-13bcea757525
// Along with big-calendar documentation found here: https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page

// Setups the localizer by providing the moment object
const localizer = momentLocalizer(moment)

const events = [
  {
    start: moment("2024-11-01 01:00:00").toDate(),
    end: moment("2024-11-01 04:00:00").toDate(),
    title: "tester testing",
  }

];

export default function EventCalendar() {
  return <Calendar
  events={events}
  localizer={localizer}
  views={['month', 'week', 'day']}
  style = {{height: 700, width: '60%'}} />
}; 