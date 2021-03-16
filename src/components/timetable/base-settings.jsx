import React, { useState } from 'react';
import Input from '../form/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BaseSettings = ({ sessionTime }) => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--edit mt-8 card">
      <div className="timetable-card__heading mb-2 ">Базовые настройки</div>
      <label className="timetable-card__label mb-1">Базовая длительность сеанса:</label>
      {isEdit ? (
        <>
          <Input className="input timetable-card__input ml-1 mb-1" name="sessionTime" type="number" />
          <span className="timetable-card__value ml-1 mb-1">мин</span>
          <div
            onClick={() => setIsEdit(false)}
            className="timetable-card__btn-edit--primary btn--edit btn--hover-success">
            <FontAwesomeIcon icon="check" />
          </div>
          <div onClick={() => setIsEdit(false)} className="timetable-card__btn-edit btn--edit btn--hover-fail">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
      ) : (
        <>
          <span className="timetable-card__value">{sessionTime}</span>
          <div onClick={() => setIsEdit(true)} className="timetable-card__btn-edit btn--edit">
            <FontAwesomeIcon icon="pen" />
          </div>
        </>
      )}

      <span className="timetable-card__tip ">
        Возможная длительность ваших услуг:
        {/* generate */}
        <span className="timetable-card__tip--primary"> 1ч, 2ч, 3ч и т.д.</span>
      </span>
    </div>
  );
};

export default BaseSettings;
