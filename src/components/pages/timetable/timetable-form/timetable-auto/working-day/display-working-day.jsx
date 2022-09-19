import React from 'react';
import Pen from '../../../../../base/icons/pen';
import displayDuration from '../../../../utils/display-duration';

const DisplayWorkingDay = ({ startEditWorkingDay, values, isDisabled }) => {
  const { startAt, endAt } = values.auto.workingDay;

  const stringStartAt = displayDuration(startAt);
  const stringEndAt = displayDuration(endAt);

  return (
    <>
      <span className="timetable-card__value ml-1 mt-5">{`${stringStartAt} - ${stringEndAt}`}</span>
      {!isDisabled && (
        <div
          onClick={startEditWorkingDay}
          className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn-icon"
        >
          <Pen />
        </div>
      )}
    </>
  );
};

export default DisplayWorkingDay;
