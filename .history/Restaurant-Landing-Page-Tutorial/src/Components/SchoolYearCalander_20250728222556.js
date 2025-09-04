import React, { useState, useEffect } from 'react';

const SchoolYearCalendar = () => {
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(8); // August
  const [days, setDays] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    setDays(daysArray);
  }, [year, month]);

  const handleMonthChange = (newMonth) => {
    setMonth(newMonth);
  };

  return (
    <div className="school-year-calendar">
      <h2>School Year Calendar</h2>
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(month - 1)}>Prev</button>
        <h3>{getMonthName(month)} {year}</h3>
        <button onClick={() => handleMonthChange(month + 1)}>Next</button>
      </div>
      <div className="calendar-body">
        {days.map((day) => (
          <div key={day} className="day">
            {day}
          </div>
        ))}
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

export default SchoolYearCalendar;