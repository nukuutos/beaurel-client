import React from 'react';
import Result from '../../../../../../../../shared/booking/result/result';
import useUpdateAppointment from './use-update-appointment';

const UpdateResult = ({ state, appointment, goToSuccess, backToTimetable }) => {
  const [bookTime, isLoading] = useUpdateAppointment({ state, appointment, goToSuccess });

  return (
    <Result state={state} isLoading={isLoading} onClickClose={backToTimetable}>
      <button
        disabled={isLoading}
        onClick={bookTime}
        className="booking-result__button btn btn--primary mt-6"
        type="submit"
      >
        Обновить запись
      </button>
    </Result>
  );
};

export default UpdateResult;
