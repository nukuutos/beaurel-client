import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useTimeFrame from '../use-week/use-time-frame';
import { getIsUntilDate } from '../use-week/utils/time-frame';

const BookingTimetableHeader = ({ step, startDateState }) => {
  const [startDayData, setStartDay] = startDateState;

  const prevWeek = () => setStartDay((today) => today.weekday(-7));
  const nextWeek = () => setStartDay((today) => today.weekday(7));

  const { today, startDay } = startDayData;
  const { untilDate } = useTimeFrame();

  const isStartDayBeforeOrSameToday = startDay.isSameOrBefore(today);

  const weekEnd = startDay.weekday(6);
  const isUntilDate = step === 1 || getIsUntilDate(weekEnd, untilDate);

  const leftArrowDisabledClassName = isStartDayBeforeOrSameToday
    ? 'booking-timetable__arrow--disabled'
    : '';

  const rightArrowDisabledClassName = isUntilDate ? '' : 'booking-timetable__arrow--disabled';

  return (
    <div className="booking-timetable__header mb-7">
      <button
        type="button"
        onClick={prevWeek}
        className={`booking-timetable__arrow ${leftArrowDisabledClassName} btn-icon mr-6`}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </button>
      <h2 className="heading booking-timetable__heading ">Выберите Время</h2>
      <button
        type="button"
        onClick={nextWeek}
        className={`booking-timetable__arrow ${rightArrowDisabledClassName} btn-icon ml-6`}
      >
        <FontAwesomeIcon icon="chevron-right" />
      </button>
    </div>
  );
};
export default BookingTimetableHeader;