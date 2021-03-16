import React, { useState, useRef, useEffect } from 'react';
// import Modal from '../../../utils/modal';
// import { useSelector, useDispatch } from 'react-redux';
// import displayDuration from '../services/utils/display-duration';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import asyncCall from '../../../../utils/async-call';
// import Spinner from '../../../utils/spinner';
// import { setAlert } from '../../../../redux/alert/actions';

const BookingSuccess = ({ onClickClose }) => {
  // const [{ date, time, service }, { accessToken, id: profileId }] = useSelector((state) => [
  //   state.appointments.bookingAppointment,
  //   state.auth,
  // ]);

  return (
    <div className="booking-success card">
      <h2 className="booking-success__heading heading-primary">Успех</h2>
      <img className="booking-success__svg mt-8" src="/svg/success.svg" alt="Appointment image" />

      <p className="booking-success__text mt-6">
        После подверждения записи мастером Вам придёт уведомление и СМС на Ваш номер телефона.
      </p>

      <button onClick={() => onClickClose()} className={`booking-success__button btn btn--primary mt-6`} type="submit">
        Завершить
      </button>
    </div>
  );
};

export default BookingSuccess;
