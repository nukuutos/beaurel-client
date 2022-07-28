import React from 'react';
import { useSelector } from 'react-redux';
import RadioButton from '../../../base/form/radio-button';

const TimetableType = ({ values, editState, resetForm }) => {
  const { update } = useSelector((state) => state.timetable);
  const [{ isEditing }] = editState;
  const { type } = values;

  const isDisabled = update.date || isEditing;
  const disabledClassName = isDisabled ? 'radio-button--disabled' : '';

  const handleClick = (value) => (type !== value ? resetForm : null);

  const autoHandleClick = handleClick('auto');
  const manuallyHandleClick = handleClick('manually');

  return (
    <div className="timetable__timetable-card timetable-card mt-6 card">
      <div className="timetable-card__heading ">Тип расписания</div>

      <label htmlFor="auto" className="timetable-card__label mt-3">
        Автоматически:
      </label>
      <RadioButton
        disabled={isDisabled}
        checked={type === 'auto'}
        className={`timetable-card__value mt-3 ml-1 ${disabledClassName}`}
        name="type"
        value="auto"
        id="auto"
        onClick={autoHandleClick}
      />

      <label htmlFor="manually" className="timetable-card__value timetable-card__label mt-2">
        Вручную:
      </label>

      <RadioButton
        disabled={isDisabled}
        className={`timetable-card__value mt-2 ml-1 ${disabledClassName}`}
        name="type"
        checked={type === 'manually'}
        value="manually"
        id="manually"
        onClick={manuallyHandleClick}
      />
    </div>
  );
};

export default TimetableType;
