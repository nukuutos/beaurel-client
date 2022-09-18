import React from 'react';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../base/modal/modal-heading';

const BookingSuccess = ({ close }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`booking-success ${isPhone ? '' : 'card'}`}>
      <ModalHeading title="Успешно" titleDesktopClassName="booking-success__heading" />
      <img className="booking-success__svg mt-2" src="/svg/success.svg" alt="Appointment" />

      <p className="booking-success__text mt-6">
        {/* После подверждения записи мастером Вам придёт уведомление и СМС на Ваш номер телефона. */}
        Вы успешно совершили запись, дождитесь ответа мастера!
      </p>

      <button
        onClick={close}
        className="booking-success__button btn btn--primary mt-6"
        type="submit"
      >
        Завершить
      </button>
    </div>
  );
};

export default BookingSuccess;
