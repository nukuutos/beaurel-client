import React from 'react';
import { WEEKDAYS } from './utils';

const DisplayWeekdaysNames = () =>
  WEEKDAYS.map((weekday) => (
    <div key={weekday} className="date-picker__weekday mb-3">
      {weekday.toUpperCase()}
    </div>
  ));

export default DisplayWeekdaysNames;
