import React, { useState } from 'react';
import RadioButton from '../form/radio-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TimetableType = ({ type, isDisabled }) => {
  // const [isDisabled, setIsDisabled] = useState(update ? true : false);

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Тип расписания</div>

      <span className="timetable-card__label mt-3">Автоматически:</span>
      <RadioButton
        disabled={isDisabled}
        defaultChecked={type === 'auto'}
        className={`timetable-card__value mt-3 ml-1 ${isDisabled ? 'radio-button--disabled' : ''}`}
        name="type"
        value="auto"
      />

      {/* {isDisabled ? (
        <div
          onClick={() => {
            setIsDisabled(false);
          }}
          className="timetable-card__btn-edit btn--edit">
          <FontAwesomeIcon icon="pen" />
        </div>
      ) : (
        <>
          <div
            onClick={() => setIsDisabled(true)}
            className="timetable-card__btn-edit--primary btn--edit btn--hover-success">
            <FontAwesomeIcon icon="check" />
          </div>
          <div onClick={() => setIsDisabled(true)} className="timetable-card__btn-edit btn--edit btn--hover-fail">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
      )} */}

      <span className="timetable-card__value timetable-card__label mt-2">Вручную:</span>

      <RadioButton
        disabled={isDisabled}
        className={`timetable-card__value mt-2 ml-1 ${isDisabled ? 'radio-button--disabled' : ''}`}
        name="type"
        defaultChecked={type === 'manually'}
        value="manually"
      />
    </div>
  );
};

export default TimetableType;
