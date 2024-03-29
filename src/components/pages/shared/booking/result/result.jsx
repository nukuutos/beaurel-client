import React from 'react';
import { useSelector } from 'react-redux';
import { MONTHS } from '../../../../base/date-picker/utils';
import ModalHeading from '../../../../base/modal/modal-heading';
import displayDuration from '../../../utils/display-duration';
import BackButton from './back-button';

const displayAppointmentDuration = (time, serviceDuration) => {
  const endAt = (time + Number(serviceDuration)) % (24 * 60);
  return `${displayDuration(time)} - ${displayDuration(endAt)}`;
};

const displayDate = (date) => {
  const month = MONTHS[date.month()].toLowerCase();
  return `${date.date()} ${month} ${date.year()}`;
};

const Result = ({ state, onClickClose, children, isLoading }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const { date, time, service } = state;

  const duration = displayAppointmentDuration(time, service.duration);
  const formattedDate = displayDate(date);

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}

      <div className="booking-result">
        {isLoading && !isPhone && <div className="spinner-with-background" />}

        {!isPhone && <BackButton onClickClose={onClickClose} />}

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
        <div className="booking-result__value mt-2">{duration}</div>

        <span className="booking-result__label mt-2">Дата:</span>
        <div className="booking-result__value mt-2">{formattedDate}</div>

        {children}
      </div>
    </>
  );
};

export default Result;
