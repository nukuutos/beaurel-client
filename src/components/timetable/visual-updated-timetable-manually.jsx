import { translateWeekdaysFromRU, translateWeekdaysFromEN } from './utils/translate';
import displayDuration from '../services/utils/display-duration';
import convertDateToString from '../profile/section-cards/timetable/utils/convert-date-to-string';

const VisualUpdatedTimetableManually = ({ update }) => {
  const { date } = update;

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание c {convertDateToString(new Date(date))}</div>
      {/* date */}
      <div className="timetable-visual mt-4">
        {/* this data is based of sessionTime weekends and */}
        {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((russianWeekdayName, i) => {
          const {
            manually: { appointments },
          } = update;
          const weekday = translateWeekdaysFromRU[russianWeekdayName];

          return (
            <div className="timetable-visual__weekday weekday">
              <div className="weekday__name">{russianWeekdayName}</div>
              <div className="weekday__appointments">
                {appointments[weekday].map((time, i) => {
                  return (
                    <span onClick={onClick} key={i} className={`weekday__time mt-5`}>
                      {displayDuration(time)}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisualUpdatedTimetableManually;
