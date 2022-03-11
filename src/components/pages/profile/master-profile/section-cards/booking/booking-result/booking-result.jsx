import React from 'react';
import { useSelector } from 'react-redux';
import displayDuration from '../utils/display-duration';
import { MONTHS } from '../booking-timetable/display-timetable/utils/week';
import useBookTime from './use-book-time';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import BackButton from './back-button';

const BookingResult = ({ setStep, onClickClose }) => {
  const [{ date, time, service }, { isPhone }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
    state.screenSize,
  ]);

  const [bookTime, isLoading] = useBookTime(setStep);

  const displayAppointmentDuration = () => {
    const endAt = time + service.duration;
    return `${displayDuration(time)} - ${displayDuration(endAt)}`;
  };

  const displayDate = () => {
    const month = MONTHS[date.month()].toLowerCase();
    return `${date.date()} ${month} ${date.year()}`;
  };

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}

      <div className={`booking-result ${isPhone ? '' : 'card'}`}>
        {isLoading && !isPhone && <div className="spinner-with-background" />}

        <BackButton onClickClose={onClickClose} />

        <ModalHeading
          title="Ваша запись"
          titleDesktopClassName="booking-result__heading"
          onClickClose={onClickClose}
        />

        <img className="booking-result__svg" src="/svg/appointment.svg" alt="Appointment" />

        <span className="booking-result__label mt-6">Услуга:</span>
        <div className="booking-result__value mt-6">{service.title}</div>

        <span className="booking-result__label mt-2">Время:</span>
        <div className="booking-result__value mt-2">{displayAppointmentDuration()}</div>

        <span className="booking-result__label mt-2">Дата:</span>
        <div className="booking-result__value mt-2">{displayDate()}</div>

        {/* <div className="booking-result__buttons mt-6"> */}
        <button
          disabled={isLoading}
          onClick={bookTime}
          className="booking-result__button btn btn--primary mt-7"
          type="submit"
        >
          Записаться
        </button>
        {/* </div> */}
      </div>
    </>
  );
};

export default BookingResult;
