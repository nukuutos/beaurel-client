import React from 'react';
import generatePossibleAppointmentsTime from './utils/generate-possible-appointments-time';
import { FieldArray } from 'formik';
import weekdaysRU from './utils/weekdays-ru';
import insertElementInSortedArray from './utils/insert-element-in-sorted-array';

const VisualTimetableAuto = ({ values, update, isEditing }) => {
  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
      <div className="timetable-visual mt-4">
        {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
          const {
            sessionTime,
            auto: { weekends, workingDay, exceptions },
          } = values;

          const possibleAppointmentsTime = weekends.includes(weekdayIndex)
            ? []
            : generatePossibleAppointmentsTime(workingDay, sessionTime);

          return (
            <FieldArray
              key={weekdayIndex}
              name={`auto.exceptions[${weekdayIndex}]`}
              render={({ remove, insert }) => (
                <div className="timetable-visual__weekday weekday" key={weekdayIndex}>
                  <div className="weekday__name">{russianWeekdayName}</div>
                  <div className="weekday__appointments">
                    {possibleAppointmentsTime.map(({ time, value }, i) => {
                      const exception = {
                        onClick: () => remove(exceptions[weekdayIndex].indexOf(value)),
                        className: 'weekday__time--exception',
                      };

                      const possibleTime = {
                        onClick: () => insertElementInSortedArray(value, exceptions[weekdayIndex], insert),
                        className: '',
                      };

                      const { onClick, className } = exceptions[weekdayIndex].includes(value)
                        ? exception
                        : possibleTime;

                      return (
                        <span
                          onClick={onClick}
                          key={i}
                          className={`weekday__time ${className} ${isEditing ? 'btn--disabled' : ''} 
                          ${update || isEditing ? 'weekday__time--disabled' : ''} mt-5`}>
                          {time}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VisualTimetableAuto;
