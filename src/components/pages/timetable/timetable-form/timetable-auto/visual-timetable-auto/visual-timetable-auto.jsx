import React from 'react';
import { FieldArray } from 'formik';
import { useSelector } from 'react-redux';
import weekdaysRU from '../../../utils/weekdays-ru';
import getPossibleAppointmentTimes from '../../../utils/get-possible-appointment-times/get-possible-appointment-times';
import getTimeData from './get-time-data';

const VisualTimetableAuto = ({ editState, values }) => {
  const { update } = useSelector((state) => state.timetable);
  const [{ isEditing }] = editState;

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading">Расписание</div>
      <div className="timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, weekdayIndex) => {
          const possibleAppointmentTimes = getPossibleAppointmentTimes(values, weekdayIndex);

          return (
            <FieldArray
              key={weekdayName}
              name={`auto.exceptions[${weekdayIndex}]`}
              render={(arrayFieldProps) => (
                <div className="timetable-visual__weekday weekday" key={weekdayName}>
                  <div className="weekday__name">{weekdayName}</div>
                  <div className="weekday__appointments">
                    {possibleAppointmentTimes.map(({ time, value }) => {
                      const { onClick, className } = getTimeData({
                        values,
                        time: value,
                        index: weekdayIndex,
                        ...arrayFieldProps,
                      });

                      const isDisabled = update.date || isEditing;
                      const disabledClassName = isDisabled ? 'btn--disabled' : '';

                      return (
                        <span
                          onClick={onClick}
                          key={time}
                          className={`weekday__time ${className} ${disabledClassName} mt-5`}
                        >
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
