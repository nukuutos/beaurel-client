import React from 'react';
import { useSelector } from 'react-redux';
import displayDuration from '../../services/utils/display-duration';
import { MONTHS } from '../booking-timetable/utils/week';
import useMediaQuery from '../../../../../hooks/use-media-query';
import useBookTime from './use-book-time';
import ModalHeading from '../../../../utils/modal/modal-heading';

const BookingResult = ({ setStep, onClickClose }) => {
  const [{ date, time, service }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
  ]);

  const isPhone = useMediaQuery(600);
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

        <ModalHeading
          title="Информация о записи"
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

        <div className="booking-result__buttons mt-6">
          {!isPhone && (
            <button
              onClick={onClickClose}
              className="btn btn--secondary  btn--gray mr-4"
              type="submit"
            >
              Назад
            </button>
          )}
          <button
            disabled={isLoading}
            onClick={bookTime}
            className={`btn btn--primary `}
            type="submit"
          >
            Записаться
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingResult;
