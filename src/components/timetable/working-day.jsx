import React, { useState } from 'react';
import Select from '../form/select';
import renderDurationOptions from '../services/utils/render-duration-options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from '../services/utils/display-duration';

const WorkingDay = ({ workingDay, sessionTime }) => {
  const [isWorkingDayEdit, setIsWorkingDayEdit] = useState(false);

  return (
    <>
      <label className="timetable-card__label  mt-5">Рабочий день:</label>
      {isWorkingDayEdit ? (
        <>
          <span className="timetable-card__value ml-1 mt-5 ">
            <Select className="timetable-card__select select mr-1" name="auto.workingDay.startAt" as="select">
              {renderDurationOptions(sessionTime)}
            </Select>
            -
            <Select className="timetable-card__select select ml-1" name="auto.workingDay.endAt" as="select">
              {renderDurationOptions(sessionTime)}
            </Select>
          </span>
          <div
            onClick={() => setIsWorkingDayEdit(false)}
            className="timetable-card__btn-edit--primary btn--edit btn--hover-success timetable-card__btn-edit--bottom">
            <FontAwesomeIcon icon="check" />
          </div>
          <div
            onClick={() => setIsWorkingDayEdit(false)}
            className="timetable-card__btn-edit btn--edit btn--hover-fail timetable-card__btn-edit--bottom">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
      ) : (
        <>
          <span className="timetable-card__value ml-1 mt-5">
            {`${displayDuration(workingDay.startAt)} - ${displayDuration(workingDay.endAt)}`}
          </span>
          <div
            onClick={() => setIsWorkingDayEdit(true)}
            className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn--edit">
            <FontAwesomeIcon icon="pen" />
          </div>
        </>
      )}
    </>
  );
};

export default WorkingDay;
