import React from 'react';

const DisplayDates = ({ dates, getClassName, handleClick }) =>
  dates.map((week) =>
    week.map((date) => {
      const onClick = () => handleClick(date);
      const className = getClassName(date);
      const key = date.format();
      const dayOfMonth = date.date();

      return (
        <div key={key} onClick={onClick} className={`date-picker__date ${className}`}>
          {dayOfMonth}
        </div>
      );
    })
  );

export default DisplayDates;
