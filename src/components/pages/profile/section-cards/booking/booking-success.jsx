import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAppointment } from '../../../../../redux/appointments/actions';
import ModalHeading from '../../../../base/modal/modal-heading';

const BookingSuccess = ({ onClickClose }) => {
  const dispatch = useDispatch();
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`booking-success ${isPhone ? '' : 'card'}`}>
      <ModalHeading title="Успех" />
      <img className="booking-success__svg mt-8" src="/svg/success.svg" alt="Appointment" />

      <p className="booking-success__text mt-6">
        После подверждения записи мастером Вам придёт уведомление и СМС на Ваш номер телефона.
      </p>

      <button
        onClick={() => {
          onClickClose();
          dispatch(unsetAppointment());
        }}
        className="booking-success__button btn btn--primary mt-6"
        type="submit"
      >
        Завершить
      </button>
    </div>
  );
};

export default BookingSuccess;
