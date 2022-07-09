import React, { useState } from 'react';
import EditManuallyAppointments from '../../../shared/edit-manually-appointments/edit-manually-appointments';
import DisplayDay from './display-day';
import weekdaysRU from '../../../utils/weekdays-ru';

const VisualTimetableManually = ({ values, setFieldError, errors, submitForm, editState }) => {
  const modalState = useState({ isOpen: false, weekdayIndex: null });
  const [{ isOpen }] = modalState;

  return (
    <>
      <h2 className="sign-up__heading">Укажите время ваших записей</h2>

      {/* <div> */}
      <div className="create-timetable__auto-timetable timetable-visual mt-4">
        {weekdaysRU.map((weekdayName, index) => (
          <DisplayDay
            weekdayName={weekdayName}
            modalState={modalState}
            index={index}
            editState={editState}
            values={values}
            key={weekdayName}
          />
        ))}

        {isOpen && (
          <EditManuallyAppointments
            errors={errors}
            setFieldError={setFieldError}
            modalState={modalState}
            values={values}
          />
        )}
      </div>

      <button
        onClick={submitForm}
        type="submit"
        className="create-timetable__btn btn btn--primary sign-up__btn mt-6"
      >
        Готово
      </button>
      {/* </div> */}
    </>
  );
};

export default VisualTimetableManually;
