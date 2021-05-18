import React from 'react';
import RadioButton from '../form/radio-button';

const TimetableType = ({ type, update, isEditing, resetForm }) => {
  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Тип расписания</div>

      <span className="timetable-card__label mt-3">Автоматически:</span>
      <RadioButton
        disabled={update || isEditing}
        checked={type === 'auto'}
        className={`timetable-card__value mt-3 ml-1 ${update || isEditing ? 'radio-button--disabled' : ''}`}
        name="type"
        value="auto"
        onClick={() => (type !== 'auto' ? resetForm() : null)}
      />

      <span className="timetable-card__value timetable-card__label mt-2">Вручную:</span>

      <RadioButton
        disabled={update || isEditing}
        className={`timetable-card__value mt-2 ml-1 ${update || isEditing ? 'radio-button--disabled' : ''}`}
        name="type"
        checked={type === 'manually'}
        value="manually"
        onClick={() => (type !== 'manually' ? resetForm() : null)}
      />
    </div>
  );
};

export default TimetableType;
