import React from 'react';
import { useSelector } from 'react-redux';
import getPossibleAppointmentTimes from '../utils/get-possible-appointment-times/get-possible-appointment-times';
import weekdaysRU from '../utils/weekdays-ru';

const getTimeClassName = (value, exceptionsDay) => {
  const isException = exceptionsDay.includes(value);
  if (isException) return 'weekday__time--exception';
  return '';
};

const VisualUpdatedTimetableAuto = () => {
  const { update } = useSelector((state) => state.timetable);

  return weekdaysRU.map((weekdayName, weekdayIndex) => {
    const { exceptions } = update.auto;

    const appointmentTimes = getPossibleAppointmentTimes(update, weekdayIndex);
    const exceptionsDay = exceptions[weekdayIndex];

    return (
      <div className="timetable-visual__weekday weekday" key={weekdayName}>
        <div className="weekday__name">{weekdayName}</div>
        <div className="weekday__appointments">
          {appointmentTimes.map(({ time, value }) => {
            const className = getTimeClassName(value, exceptionsDay);
            return (
              <span
                key={time}
                className={`weekday__time weekday__time--disabled ${className} mt-5`}
              >
                {time}
              </span>
            );
          })}
        </div>
      </div>
    );
  });
};

export default VisualUpdatedTimetableAuto;
