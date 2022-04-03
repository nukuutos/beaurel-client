import { FieldArray } from 'formik';
import weekdaysRU from '../../../utils/weekdays-ru';
import getWeekdayData from './get-weekday-data';

const Passwords = ({ values, goNext }) => (
  <>
    <h2 className="sign-up__heading">Отметьте выходные дни</h2>

    <FieldArray
      name="auto.weekends"
      render={(fieldArrayProps) => (
        <div className="create-timetable__weekends">
          {weekdaysRU.map((weekdayName, weekdayIndex) => {
            const { onClick, className } = getWeekdayData({
              values,
              weekdayIndex,
              ...fieldArrayProps,
            });

            const weekdayToDisplay = weekdayName.toUpperCase();

            return (
              <div
                name={`auto.weekends.${weekdayIndex}`}
                className={`weekends__day mt-6 ${className}`}
                onClick={onClick}
                key={weekdayName}
              >
                {weekdayToDisplay}
              </div>
            );
          })}
        </div>
      )}
    />

    <div className="sign-up__group">
      <button onClick={goNext} type="button" className="btn btn--primary sign-up__btn mt-6">
        Продолжить
      </button>
    </div>
  </>
);

export default Passwords;
