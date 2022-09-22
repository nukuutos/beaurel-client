import React from 'react';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../../../base/modal/modal-heading';

const BookingSuccess = ({ onClickClose }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`booking-success ${isPhone ? '' : 'card'}`}>
      <ModalHeading title="Успех" />
      <img className="booking-success__svg mt-8" src="/svg/success.svg" alt="Appointment" />

      <p className="booking-success__text mt-6">Запись успешно обновлена!</p>

      <button
        onClick={onClickClose}
        className="booking-success__button btn btn--primary mt-6"
        type="submit"
      >
        Завершить
      </button>
    </div>
  );
};

export default BookingSuccess;
