import React from 'react';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../../../../base/modal/modal-heading';
import { MONTHS } from '../../../../../../../../profile/master-profile/section-cards/booking/booking-timetable/display-timetable/utils/week';
import displayDuration from '../utils/display-duration';
import BackButton from './back-button';
import useUpdateAppointment from './use-update-appointment';

const UpdateResult = ({ appointment, setStep, onClickClose }) => {
  const [{ date, time, service }, { isPhone }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment,
    state.screenSize,
  ]);

  const [bookTime, isLoading] = useUpdateAppointment(appointment, setStep);

  const displayAppointmentDuration = () => {
    const endAt = time + Number(service.duration);
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

        {service.parameter && (
          <>
            <span className="booking-result__label mt-2">Параметр:</span>
            <div className="booking-result__value mt-2">{service.parameter}</div>
          </>
        )}

        <span className="booking-result__label mt-2">Время:</span>
        <div className="booking-result__value mt-2">{displayAppointmentDuration()}</div>

        <span className="booking-result__label mt-2">Дата:</span>
        <div className="booking-result__value mt-2">{displayDate()}</div>

        <button
          disabled={isLoading}
          onClick={bookTime}
          className="booking-result__button btn btn--primary mt-6"
          type="submit"
        >
          Обновить запись
        </button>
      </div>
    </>
  );
};

export default UpdateResult;
