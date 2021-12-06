import React from 'react';
import generatePossibleAppointmentsTime from '../utils/generate-possible-appointments-time';
import weekdaysRU from '../utils/weekdays-ru';

const VisualUpdatedTimetableAuto = ({ update }) =>
  weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
    const {
      sessionTime,
      auto: { weekends, workingDay, exceptions },
    } = update;

    console.log(exceptions);

    const possibleAppointmentsTime = weekends.includes(weekdayIndex)
      ? []
      : generatePossibleAppointmentsTime(workingDay, sessionTime);

    return (
      <div className="timetable-visual__weekday weekday" key={weekdayIndex}>
        <div className="weekday__name">{russianWeekdayName}</div>
        <div className="weekday__appointments">
          {possibleAppointmentsTime.map(({ time, value }, i) => {
            console.log(value);
            const className = exceptions[weekdayIndex].includes(value)
              ? 'weekday__time--exception'
              : '';

            return (
              <span key={i} className={`weekday__time weekday__time--disabled ${className} mt-5`}>
                {time}
              </span>
            );
          })}
        </div>
      </div>
    );
  });

export default VisualUpdatedTimetableAuto;
