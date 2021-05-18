import React, { useState } from 'react';
import useDatePicker from './use-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

const getTommorow = () => {
  const today = new Date();
  const tommorow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  tommorow.setHours(0, 0, 0, 0);

  return tommorow.getTime();
};

const getMonthAndDateFromTS = (timestamp) => {
  const date = new Date(timestamp);
  return MONTHS[date.getMonth()] + ', ' + date.getDate();
};

const DatePicker = ({ className, cancel, submit }) => {
  const [choice, setChoice] = useState(getTommorow()); // ms

  const [dates, monthDates, setCurrentDate] = useDatePicker();

  const [firstMonthDate] = monthDates;

  const handleClick = (date) => {
    const [firstDate, lastDate] = monthDates;

    if (date.getTime() < Date.now()) return;

    if (date.getTime() < firstDate.getTime())
      return setCurrentDate(new Date(firstDate.getFullYear(), firstDate.getMonth(), 0));

    if (date.getTime() > lastDate.getTime()) {
      return setCurrentDate(new Date(lastDate.getFullYear(), lastDate.getMonth() + 1, 1));
    }

    setChoice(date.getTime());
  };

  const handleClassName = (date) => {
    const [firstDate, lastDate] = monthDates;

    const isNextMonth = date.getTime() > lastDate.getTime();
    const isPrevMonth = date.getTime() < firstDate.getTime();
    const isActiveDate = choice === date.getTime();

    if (date.getTime() < Date.now()) return 'date-picker__date--unavailable date-picker__date--disabled';
    if (isNextMonth || isPrevMonth) return 'date-picker__date--unavailable';
    if (isActiveDate) return 'date-picker__date--active';
    return '';
  };

  const onArrowRightClick = () => {
    const [firstDate] = monthDates;
    return setCurrentDate(new Date(firstDate.getFullYear(), firstDate.getMonth() + 1, 1));
  };

  const onArrowLeftClick = () => {
    const [firstDate] = monthDates;
    const prevMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0);

    // if (prevMonth < Date.now()) return;

    return setCurrentDate(prevMonth);
  };

  const isArrowDisabled = () => {
    const [firstDate] = monthDates;

    const prevMonth = new Date(firstDate.getFullYear(), firstDate.getMonth(), 0);
    if (prevMonth.getTime() < Date.now()) return true;

    return false;
  };

  return (
    <div className={`date-picker ${className}`}>
      <div
        onClick={() => onArrowLeftClick()}
        className={`date-picker__arrow date-picker__arrow--left 
        ${isArrowDisabled() ? 'date-picker__arrow--disabled' : ''} ml-1`}>
        <FontAwesomeIcon icon="chevron-left" />
      </div>
      <div className="date-picker__month-and-year">
        {MONTHS[firstMonthDate.getMonth()] + ', ' + firstMonthDate.getFullYear()}
      </div>
      <div onClick={() => onArrowRightClick()} className="date-picker__arrow date-picker__arrow--right mr-1">
        <FontAwesomeIcon icon="chevron-right" />
      </div>

      <div className="date-picker__choice mt-4 mb-5 ml-1">{getMonthAndDateFromTS(choice)}</div>

      {WEEKDAYS.map((weekday, i) => (
        <div key={i} className="date-picker__weekday mb-3">
          {weekday.toUpperCase()}
        </div>
      ))}
      {dates.map((week, j) => {
        return week.map((date, i) => (
          <div
            key={(j + 1) * i}
            onClick={() => handleClick(date)}
            className={`date-picker__date ${handleClassName(date)}`}>
            {date.getDate()}
          </div>
        ));
      })}

      <div className="date-picker__buttons mt-4">
        <div onClick={cancel} className="date-picker__button btn btn--secondary btn--gray btn--flat mr-2">
          отмена
        </div>
        <div
          onClick={() => submit(new Date(choice))}
          className={`date-picker__button date-picker__button--ok btn btn--secondary btn--flat`}>
          ОК
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
