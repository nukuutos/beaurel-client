import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTimeFrame from '../use-week/use-time-frame';
import { getIsFromDate, getIsUntilDate } from '../use-week/utils/time-frame';

const Arrows = ({ controllers, startDayData, day, step }) => {
  const { toPrevDay, toNextDay } = controllers;
  const { today } = startDayData;
  const { untilDate, fromDate } = useTimeFrame();

  const isDaySameOrBeforeToday =
    day.props.date.isSameOrBefore(today) ||
    !getIsFromDate(day.props.date.subtract(1, 'd'), fromDate);

  const isUntilDate = step === 1 || getIsUntilDate(day.props.date.add(1, 'd'), untilDate);

  return (
    <>
      {!isDaySameOrBeforeToday && (
        <button type="button" onClick={toPrevDay} className="booking-timetable__side">
          <div className="booking-timetable__arrow btn-icon">
            <FontAwesomeIcon icon="chevron-left" />
          </div>
        </button>
      )}

      {isUntilDate && (
        <button
          type="button"
          onClick={toNextDay}
          className="booking-timetable__side booking-timetable__side--right"
        >
          <div className="booking-timetable__arrow booking-timetable__arrow--right btn-icon">
            <FontAwesomeIcon icon="chevron-right" />
          </div>
        </button>
      )}
    </>
  );
};

export default Arrows;
