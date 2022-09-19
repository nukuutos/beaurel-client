import React from 'react';
import { useSelector } from 'react-redux';
import Pen from '../../../../../base/icons/pen';

const EditButton = ({ startEditWeekends }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const phoneClassName = isPhone ? 'timetable-card__btn-edit--bottom' : '';

  return (
    <div
      onClick={startEditWeekends}
      className={`timetable-card__btn-edit ${phoneClassName} btn-icon`}
    >
      <Pen />
    </div>
  );
};

export default EditButton;
