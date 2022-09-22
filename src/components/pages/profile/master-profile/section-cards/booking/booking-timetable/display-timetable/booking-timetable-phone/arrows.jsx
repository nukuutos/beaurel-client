import ChevronLeft from '../../../../../../../../base/icons/chevron-left';
import ChevronRight from '../../../../../../../../base/icons/chevron-right';
import useTimeFrame from '../use-week/use-time-frame';
import { getIsFromDate, getIsUntilDate } from '../use-week/utils/time-frame';

const Arrows = ({ service, controllers, startDayData, day, step }) => {
  const { toPrevDay, toNextDay } = controllers;
  const { today } = startDayData;
  const { untilDate, fromDate } = useTimeFrame(service);

  const isDayAfterToday =
    day.props.date.isAfter(today.add(1, 'd')) &&
    getIsFromDate(day.props.date.subtract(1, 'd'), fromDate);

  const isUntilDate = step === 1 || getIsUntilDate(day.props.date.add(1, 'd'), untilDate);

  return (
    <>
      {isDayAfterToday && (
        <button type="button" onClick={toPrevDay} className="booking-timetable__side">
          <div className="booking-timetable__arrow btn-icon">
            <ChevronLeft />
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
            <ChevronRight />
          </div>
        </button>
      )}
    </>
  );
};

export default Arrows;
