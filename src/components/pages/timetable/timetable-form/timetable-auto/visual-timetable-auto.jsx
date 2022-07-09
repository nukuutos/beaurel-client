import React from 'react';
import { FieldArray } from 'formik';
import { useSelector } from 'react-redux';
import weekdaysRU from '../../utils/weekdays-ru';
import getPossibleAppointmentTimes from '../../utils/get-possible-appointment-times/get-possible-appointment-times';
import AutoTimetableTime from '../../shared/auto-timetable-weekday/auto-timetable-time';
import AutoTimetableWeekday from '../../shared/auto-timetable-weekday/auto-timetable-weekday';

const VisualTimetableAuto = ({ editState, values }) => {
  const { update } = useSelector((state) => state.timetable);
  const [{ isEditing }] = editState;

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--timetable mt-8 card">
      <div className="timetable-card__heading timetable-card__heading--timetable">Расписание</div>
      <div className="timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, weekdayIndex) => {
          const possibleAppointmentTimes = getPossibleAppointmentTimes(values, weekdayIndex);

          return (
            <FieldArray
              key={weekdayName}
              name={`auto.exceptions[${weekdayIndex}]`}
              render={(arrayFieldProps) => (
                <AutoTimetableWeekday weekdayName={weekdayName}>
                  {possibleAppointmentTimes.map(({ time, value }) => {
                    const isDisabled = update.date || isEditing;

                    return (
                      <AutoTimetableTime
                        time={value}
                        values={values}
                        weekdayIndex={weekdayIndex}
                        key={time}
                        isDisabled={isDisabled}
                        {...arrayFieldProps}
                      />
                    );
                  })}
                </AutoTimetableWeekday>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VisualTimetableAuto;
