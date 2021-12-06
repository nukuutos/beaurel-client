import displayDuration from '../../services/utils/display-duration';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const VisualUpdatedTimetableManually = ({ update }) =>
  weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
    const {
      manually: { appointments },
    } = update;

    return (
      <div className="timetable-visual__weekday weekday" key={weekdayIndex}>
        <div className="weekday__name">{russianWeekdayName}</div>
        <div className="weekday__appointments">
          {appointments[weekdayIndex].map((time, i) => (
            <span key={i} className="weekday__time weekday__time--disabled mt-5">
              {displayDuration(time)}
            </span>
          ))}
        </div>
      </div>
    );
  });

export default VisualUpdatedTimetableManually;
