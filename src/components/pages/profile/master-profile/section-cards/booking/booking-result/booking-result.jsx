import React from 'react';
import { useSelector } from 'react-redux';
import useBookTime from './use-book-time';
import Result from '../../../../../shared/booking/result/result';
import Unauthorized from '../shared/unauthorized';

const BookingResult = ({ setStep, onClickClose }) => {
  const { accessToken } = useSelector((state) => state.auth);
  const [bookTime, isLoading] = useBookTime(setStep);

  return accessToken ? (
    <Result isLoading={isLoading} onClickClose={onClickClose}>
      <button
        onClick={bookTime}
        disabled={isLoading}
        className="booking-result__button btn btn--primary mt-6"
        type="submit"
      >
        Записаться
      </button>
    </Result>
  ) : (
    <Unauthorized onClickClose={onClickClose} title="Запись к мастеру">
      Необходимо зарегистрироваться, чтобы Вы смогли забронировать запись!
    </Unauthorized>
  );
};

export default BookingResult;
