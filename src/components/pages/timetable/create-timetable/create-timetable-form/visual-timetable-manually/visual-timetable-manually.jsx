import React, { useState } from 'react';
import EditModal from './edit-modal/edit-modal';
import DisplayDay from './display-day';
import weekdaysRU from '../../../utils/weekdays-ru';

const VisualTimetableManually = ({ values, submitForm, editState }) => {
  const modalState = useState({ isOpen: false, weekdayIndex: null });
  const [{ isOpen }] = modalState;

  return (
    <>
      <h2 className="sign-up__heading">Укажите время ваших записей</h2>

      <div>
        <div className="create-timetable__auto-timetable timetable-visual mt-4">
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

        <button
          onClick={submitForm}
          type="submit"
          className="create-timetable__btn btn btn--primary sign-up__btn mt-6"
        >
          Готово
        </button>
      </div>
    </>
  );
};

export default VisualTimetableManually;
