import React from 'react';
import displayDuration from '../../../utils/display-duration';
import getTimeData from './get-time-data';

const AutoTimetableTime = ({ values, time, weekdayIndex, isDisabled, ...arrayFieldProps }) => {
  const { onClick, className } = getTimeData({
    values,
    time,
    index: weekdayIndex,
    ...arrayFieldProps,
  });

  const disabledClassName = isDisabled ? 'btn--disabled' : '';

  return (
    <span
      onClick={onClick}
      key={time}
      className={`weekday__time ${className} ${disabledClassName} mt-5`}
    >
      {displayDuration(time)}
    </span>
  );
};

export default AutoTimetableTime;
