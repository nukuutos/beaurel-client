import { FieldArray } from 'formik';
import AutoTimetableTime from '../../shared/auto-timetable-weekday/auto-timetable-time';
import AutoTimetableWeekday from '../../shared/auto-timetable-weekday/auto-timetable-weekday';
import getPossibleAppointmentTimes from '../../utils/get-possible-appointment-times/get-possible-appointment-times';
import weekdaysRU from '../../utils/weekdays-ru';

const TimetableAuto = ({ values }) => (
  <>
    <h2 className="sign-up__heading">Отметьте исключения</h2>

    <div>
      <div className="create-timetable__auto-timetable timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, weekdayIndex) => {
          const possibleAppointmentTimes = getPossibleAppointmentTimes(values, weekdayIndex);

          return (
            <FieldArray
              key={weekdayName}
              name={`auto.exceptions[${weekdayIndex}]`}
              render={(arrayFieldProps) => (
                <AutoTimetableWeekday weekdayName={weekdayName}>
                  {possibleAppointmentTimes.map(({ time, value }) => {
                    return (
                      <AutoTimetableTime
                        time={value}
                        values={values}
                        weekdayIndex={weekdayIndex}
                        key={time}
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
      <button type="submit" className="create-timetable__btn btn btn--primary sign-up__btn mt-6">
        Готово
      </button>
    </div>
  </>
);

export default TimetableAuto;
