import React from 'react';
import { translateWeekdaysFromRU } from './utils/translate';
import generatePossibleAppointmentsTime from './utils/generate-possible-appointments-time';
import { FieldArray } from 'formik';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const insertElementInSortedArray = (value, array, insert) => {
  // insertion if array length === 0
  if (array.length === 0) {
    insert(0, value);
    return;
  }

  // insertion(from 0 to n-1) if array has elements
  for (let i = 0; i < array.length; i++) {
    const nextElement = array[i];
    if (value < nextElement && i === 0) {
      insert(0, value);
      return;
    }

    if (value < nextElement) {
      insert(i, value);
      return;
    }
  }

  // insertion to the end of the array(n);
  insert(array.length, value);
};

const VisualTimetableAuto = ({ values, update, isEditing }) => {
  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
      <div className="timetable-visual mt-4">
        {/* this data is based of sessionTime weekends and */}
        {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
          const {
            sessionTime,
            auto: { weekends, workingDay, exceptions },
          } = values;

          // const weekday = translateWeekdaysFromRU[russianWeekdayName];

          const possibleAppointmentsTime = weekends.includes(weekdayIndex)
            ? []
            : generatePossibleAppointmentsTime(workingDay, sessionTime);

          return (
            <FieldArray
              key={weekdayIndex}
              name={`auto.exceptions[${weekdayIndex}]`}
              render={({ remove, push, insert }) => (
                <div className="timetable-visual__weekday weekday" key={weekdayIndex}>
                  <div className="weekday__name">{russianWeekdayName}</div>
                  <div className="weekday__appointments">
                    {possibleAppointmentsTime.map(({ time, value }, i) => {
                      const exception = {
                        onClick: () => remove(exceptions[weekdayIndex].indexOf(value)),
                        className: 'weekday__time--fail',
                      };

                      const possibleTime = {
                        // onClick: () => push(value),
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
