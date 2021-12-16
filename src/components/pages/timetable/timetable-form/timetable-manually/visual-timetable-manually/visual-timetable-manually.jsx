import React, { useState } from 'react';
import weekdaysRU from '../../../utils/weekdays-ru';
import EditModal from './edit-modal/edit-modal';
import DisplayDay from './display-day';

const VisualTimetableManually = ({ values, editState }) => {
  const modalState = useState({ isOpen: false, weekdayIndex: null });
  const [{ isOpen }] = modalState;

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
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
        {isOpen && <EditModal modalState={modalState} values={values} />}
      </div>
    </div>
  );
};

export default VisualTimetableManually;
