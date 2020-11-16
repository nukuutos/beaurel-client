import { useState, useEffect } from 'react';
import { DAYS_OF_THE_WEEK, MONTHS, getStartDayOfWeek } from './utils/week';
import Day from './day';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WeekButton from './week-button';

const Week = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [weekDay, setWeekDay] = useState(date.getDay());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfWeek(date, day, weekDay));

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfWeek(date, day, weekDay));
  }, [date]);

  // we getting data of booking appointments
  // then determine if time is free
  // rendering the week

  const renderWeek = () => {
    const data = [
      ['10:00', '11:00', '12:00'],
      ['10:00', '11:00', '12:00'],
      ['10:00', '11:00', '12:00'],
      ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    ];

    const currentDay = today.getDate();
    const startDayOfWeek = getStartDayOfWeek(date, day, weekDay) + 1;
    const endDayOfWeek = startDayOfWeek + 6;
    const weekDays = [];

    for (let i = startDayOfWeek; i <= endDayOfWeek; i++) {
      const date = new Date(year, month, i);
      weekDays.push(
        <Day
          key={i}
          day={date.getDate()}
          weekDay={DAYS_OF_THE_WEEK[date.getDay()]}
          month={MONTHS[date.getMonth()]}
          timeData={data[i - currentDay]}
        />
      );
    }
    return weekDays;
  };

  return (
    <div className="week">
      <div className="week__header">
        <WeekButton onClick={() => setDate(new Date(year, month, day - 7))}>
          {/* <FontAwesomeIcon icon="chevron-left" /> */}
          <FontAwesomeIcon icon="chevron-circle-left" />
        </WeekButton>
        {/* <button className="btn--arrow" onClick={() => setDate(new Date(year, month, day - 7))} icon="chevron-left" /> */}
        <h3>Расписание</h3>
        <WeekButton onClick={() => setDate(new Date(year, month, day + 7))}>
          <FontAwesomeIcon icon="chevron-circle-right" />
        </WeekButton>
        {/* <button className="btn--arrow" onClick={() => setDate(new Date(year, month, day + 7))} icon="chevron-right" /> */}
      </div>
      {renderWeek()}
    </div>
  );
};

export default Week;
