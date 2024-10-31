import React from 'react';
import Calendar from 'react-calendar';
import { useState } from 'react';


export default function CalendarUF() {
  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <Calendar
      onChange={onChange}
      value={value}
    />
  );
}