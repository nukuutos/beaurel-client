import React, { useState } from 'react';
import weekdaysRU from '../../../utils/weekdays-ru';
import EditModal from './edit-modal/edit-modal';
import DisplayDay from './display-day';

const VisualTimetableManually = ({ values, editState, errors, setFieldError }) => {
  const modalState = useState({ isOpen: false, weekdayIndex: null });
  const [{ isOpen }] = modalState;

  return (
    <div className="timetable__timetable-card timetable-card timetable-card--timetable mt-8 card">
      <div className="timetable-card__heading timetable-card__heading--timetable mb-2 ">
        Расписание
      </div>
      <div className="timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, index) => (
          <DisplayDay
            weekdayName={weekdayName}
            modalState={modalState}
            index={index}
            editState={editState}
            values={values}
          />
        ))}
        {isOpen && (
          <EditModal
            errors={errors}
            setFieldError={setFieldError}
            modalState={modalState}
            values={values}
          />
        )}
      </div>
    </div>
  );
};

export default VisualTimetableManually;
