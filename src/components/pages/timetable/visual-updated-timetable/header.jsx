import React from 'react';
import { useSelector } from 'react-redux';

const Header = ({ openModal }) => {
  const [{ update }, { isPhone }] = useSelector((state) => [state.timetable, state.screenSize]);
  const { date } = update;

  return (
    <>
      <div className="timetable-card__heading">
        Расписание {isPhone && <br />}c {date.format('DD-MM-YY')}
      </div>
      <div
        onClick={openModal}
        className={`timetable-card__delete-btn btn btn--secondary btn--flat btn--fail `}
      >
        Отменить
      </div>
    </>
  );
};

export default Header;
