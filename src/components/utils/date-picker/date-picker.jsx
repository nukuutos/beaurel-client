import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSwipeable } from 'react-swipeable';
import useDatePicker from './use-date-picker';
import { toUTCDate } from './utils';
import {
  getDateUTC,
  getTommorow,
} from '../../profile/section-cards/booking/booking-timetable/booking-phone-timetable/utils';

const WEEKDAYS = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

// const getTommorow = () => {
//   const today = new Date();
//   const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
//   tommorow.setHours(0, 0, 0, 0);

//   return tommorow.getTime();
// };

const getChoice = (date) => `${MONTHS[date.month()]}, ${date.date()}`;

const DatePicker = ({ className, cancel, submit }) => {
  const [choice, setChoice] = useState(getTommorow());

  const [dates, monthDates, setCurrentDate] = useDatePicker();

  const [firstMonthDate] = monthDates;

  const handleClick = (date) => {
    const [firstDate, lastDate] = monthDates;

    if (date.isBefore(getDateUTC())) return;

    if (date.isBefore(firstDate)) return setCurrentDate((state) => [state[0] - 1, state[1]]);

    if (date.isAfter(lastDate)) return setCurrentDate((state) => [state[0] + 1, state[1]]);

    setChoice(date);
  };

  const handleClassName = (date) => {
    const [firstDate, lastDate] = monthDates;

    const isNextMonth = date.isAfter(lastDate);
    const isPrevMonth = date.isBefore(firstDate);
    const isActiveDate = date.isSame(choice, 'date');

    if (date.isBefore(getDateUTC()))
      return 'date-picker__date--unavailable date-picker__date--disabled';
    if (isNextMonth || isPrevMonth) return 'date-picker__date--unavailable';
    if (isActiveDate) return 'date-picker__date--active';
    return '';
  };

  const onArrowRightClick = () => setCurrentDate((state) => [state[0] + 1, state[1]]);

  const onArrowLeftClick = () => setCurrentDate((state) => [state[0] - 1, state[1]]);

  const isArrowDisabled = () => {
    const [firstDate] = monthDates;

    const prevMonth = firstDate.subtract(1, 'month').endOf('month');

    if (prevMonth.isBefore(getDateUTC())) return true;

    return false;
  };

  const handlers = useSwipeable({
    onSwipedRight: () => (isArrowDisabled() ? null : onArrowLeftClick()),
    onSwipedLeft: () => onArrowRightClick(),
    delta: 10,
  });

  return (
    <div {...handlers} className={`date-picker ${className}`}>
      <div
        onClick={() => onArrowLeftClick()}
        className={`date-picker__arrow date-picker__arrow--left 
        ${isArrowDisabled() ? 'date-picker__arrow--disabled' : ''} ml-1`}
      >
        <FontAwesomeIcon icon="chevron-left" />
      </div>
      <div className="date-picker__month-and-year">{`${
        MONTHS[firstMonthDate.month()]
      }, ${firstMonthDate.year()}`}</div>
      <div
        onClick={() => onArrowRightClick()}
        className="date-picker__arrow date-picker__arrow--right mr-1"
      >
        <FontAwesomeIcon icon="chevron-right" />
      </div>

      <div className="date-picker__choice mt-4 mb-5 ml-1">{getChoice(choice)}</div>

      {WEEKDAYS.map((weekday, i) => (
        <div key={i} className="date-picker__weekday mb-3">
          {weekday.toUpperCase()}
        </div>
      ))}
      {dates.map((week, j) =>
        week.map((date, i) => (
          <div
            key={(j + 1) * i}
            onClick={() => handleClick(date)}
            className={`date-picker__date ${handleClassName(date)}`}
          >
            {date.date()}
          </div>
        ))
      )}

      <div className="date-picker__buttons mt-4">
        {/* <div onClick={cancel} className="date-picker__button btn btn--secondary btn--gray btn--flat mr-2">
          отмена
        </div> */}
        <div
          onClick={() => {
            submit(toUTCDate(choice));
          }}
          className="date-picker__button btn btn--primary"
        >
          ОК
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
