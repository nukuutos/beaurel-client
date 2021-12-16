import { useSelector } from 'react-redux';
import displayDuration from '../../services/utils/display-duration';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const VisualUpdatedTimetableManually = () => {
  const { update } = useSelector((state) => state.timetable);

  return weekdaysRU.map((weekdayName, index) => {
    const { appointments } = update.manually;

    return (
      <div className="timetable-visual__weekday weekday" key={weekdayName}>
        <div className="weekday__name">{weekdayName}</div>
        <div className="weekday__appointments">
          {appointments[index].map((time) => (
            <span key={time} className="weekday__time weekday__time--disabled mt-5">
              {displayDuration(time)}
            </span>
          ))}
        </div>
      </div>
    );
  });
};

export default VisualUpdatedTimetableManually;
