import React from 'react';
import { translateWeekdaysFromRU } from './utils/translate';
import generatePossibleAppointmentsTime from './utils/generate-possible-appointments-time';
import convertDateToString from '../profile/section-cards/timetable/utils/convert-date-to-string';
const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const VisualUpdatedTimetableAuto = ({ update }) => {
  // const { date } = update;

  // return (
  //   <div className="timetable__timetable-card timetable-card mt-8 card">
  //     <div className="timetable-card__heading mb-2 ">Расписание c {convertDateToString(new Date(date))}</div>
  //     {/* date */}
  //     <div className="timetable-visual mt-4">
  // {/* this data is based of sessionTime weekends and */}
  // {
  return weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
    const {
      sessionTime,
      auto: { weekends, workingDay, exceptions },
    } = update;

    // const weekday = translateWeekdaysFromRU[russianWeekdayName];

    const possibleAppointmentsTime = weekends.includes(weekdayIndex)
      ? []
      : generatePossibleAppointmentsTime(workingDay, sessionTime);

    return (
      <div className="timetable-visual__weekday weekday" key={weekdayIndex}>
        <div className="weekday__name">{russianWeekdayName}</div>
        <div className="weekday__appointments">
          {possibleAppointmentsTime.map(({ time, value }, i) => {
            const className = exceptions[weekdayIndex].includes(value) ? 'weekday__time--fail' : '';

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
  // }
  //   </div>
  // </div>
  // );
};

export default VisualUpdatedTimetableAuto;
