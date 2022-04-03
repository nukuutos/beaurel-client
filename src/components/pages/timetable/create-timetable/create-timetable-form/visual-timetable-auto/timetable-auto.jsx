import { FieldArray } from 'formik';
import getPossibleAppointmentTimes from '../../../utils/get-possible-appointment-times/get-possible-appointment-times';
import weekdaysRU from '../../../utils/weekdays-ru';
import getTimeData from './get-time-data';

const TimetableAuto = ({ submitForm, values }) => (
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

                      return (
                        <span
                          onClick={onClick}
                          key={time}
                          className={`weekday__time ${className} mt-5`}
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
      <button type="submit" className="create-timetable__btn btn btn--primary sign-up__btn mt-6">
        Готово
      </button>
    </div>
  </>
);

export default TimetableAuto;
