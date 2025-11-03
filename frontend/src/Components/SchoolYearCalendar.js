import React, { useState, useEffect } from 'react';

const SchoolYearCalendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(8); // August
  const [events, setEvents] = useState([
    { date: '2025-08-15', event: 'First day of school' },
    { date: '2025-09-02', event: 'Labor Day' },
    { date: '2025-10-12', event: 'Columbus Day' },
    { date: '2025-11-11', event: 'Veterans Day' },
    { date: '2025-11-26', event: 'Thanksgiving Day' },
    { date: '2025-12-25', event: 'Christmas Day' },
    { date: '2026-01-01', event: 'New Year\'s Day' },
    { date: '2026-01-18', event: 'Martin Luther King Jr. Day' },
    { date: '2026-02-15', event: 'Presidents\' Day' },
    { date: '2026-03-17', event: 'St. Patrick\'s Day' },
    { date: '2026-04-10', event: 'Spring break' },
    { date: '2026-05-25', event: 'Memorial Day' },
  ]);

  // Fix: handle month/year rollover
  const handleMonthChange = (newMonth) => {
    if (newMonth < 1) {
      setMonth(12);
      setYear((prev) => prev - 1);
    } else if (newMonth > 12) {
      setMonth(1);
      setYear((prev) => prev + 1);
    } else {
      setMonth(newMonth);
    }
  };

  return (
    <div className="event-calendar-container">
      <h1 className="primary-heading">Event Calendar</h1>
      <div className="calendar-header">
        <h2>{getMonthName(month)} {year}</h2>
        <div className="cal-button">
          <button className="primary-button" onClick={() => handleMonthChange(month - 1)}>Prev</button>
          <button className="primary-button" onClick={() => handleMonthChange(month + 1)}>Next</button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="days-of-week">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="days">
          {getDaysInMonth(month, year).map((day) => (
            <div key={day} className="day">
              {day}
              {events.filter((event) => event.date === `${year}-${padZero(month)}-${padZero(day)}`).map((event) => (
                <div key={event.event} className="event">
                  {event.event}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const getMonthName = (month) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return monthNames[month - 1];
};

const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 0);
  const days = [];
  for (let i = 1; i <= date.getDate(); i++) {
    days.push(i);
  }
  return days;
};

const padZero = (num) => {
  return num.toString().padStart(2, '0');
};

export default SchoolYearCalendar;