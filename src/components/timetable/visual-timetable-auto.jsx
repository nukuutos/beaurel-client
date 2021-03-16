import React from 'react';
import { translateWeekdaysFromRU } from './utils/translate';
import generatePossibleAppointmentsTime from './utils/generate-possible-appointments-time';
import { FieldArray } from 'formik';

const VisualTimetableAuto = ({ values }) => {
  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
      <div className="timetable-visual mt-4">
        {/* this data is based of sessionTime weekends and */}
        {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((russianWeekdayName, i) => {
          const {
            sessionTime,
            auto: { weekends, workingDay, exceptions },
          } = values;

          const weekday = translateWeekdaysFromRU[russianWeekdayName];

          const possibleAppointmentsTime = weekends.includes(weekday)
            ? []
            : generatePossibleAppointmentsTime(workingDay, sessionTime);

          return (
            <FieldArray
              key={i}
              name={`auto.exceptions[${weekday}]`}
              render={({ remove, push }) => (
                <div className="timetable-visual__weekday weekday" key={i}>
                  <div className="weekday__name">{russianWeekdayName}</div>
                  <div className="weekday__appointments">
                    {possibleAppointmentsTime.map(({ time, value }, i) => {
                      const exception = {
                        onClick: () => remove(exceptions[weekday].indexOf(value)),
                        className: 'weekday__time--fail',
                      };

                      const possibleTime = {
                        onClick: () => push(value),
                        className: '',
                      };

                      const { onClick, className } = exceptions[weekday].includes(value) ? exception : possibleTime;

                      return (
                        <span onClick={onClick} key={i} className={`weekday__time ${className}  mt-5`}>
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
