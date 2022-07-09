import React from 'react';
import Result from '../../../../../../../../shared/booking/result/result';
import useUpdateAppointment from './use-update-appointment';

const UpdateResult = ({ appointment, setStep, onClickClose }) => {
  const [bookTime, isLoading] = useUpdateAppointment(appointment, setStep);

  return (
    <Result isLoading={isLoading} onClickClose={onClickClose}>
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
