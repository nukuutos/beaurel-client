import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import displayDuration from '../../services/utils/display-duration';
import convertDateToString from './utils/convert-date-to-string';

const Appointment = ({ appointment, children }) => {
  const { service, user, time, date, createdAt } = appointment;
  const { firstName, lastName, avatar, _id: userId } = user; // it can be master or customer
  const { title, price } = service;
  const { startAt } = time;

  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className="appointments__appointment-card appointment-card card mt-8">
      <img
        src={`http://localhost:5000/${avatar}`}
        alt="Avatar Image"
        className="appointment-card__avatar mb-2"
      />
      <span className="appointment-card__name mt-2">{`${firstName} ${lastName[0]}.`}</span>
      <div className="appointment-card__header-line" />

      <span className="appointment-card__service mt-3">{title}</span>

      {isPhone ? (
        <div className="appointment-card__attributes">
          <div className="appointment-card__date appointment-card__attribute">
            <FontAwesomeIcon icon={['far', 'calendar']} />\{dayjs(date).format('DD.MM.YYYY')}
          </div>
          <div className="appointment-card__time appointment-card__attribute">
            <FontAwesomeIcon icon="clock" />
            {displayDuration(startAt)}
          </div>
          <div className="appointment-card__price appointment-card__attribute">
            <FontAwesomeIcon icon="ruble-sign" />
            {price}
          </div>
        </div>
      ) : (
        <>
          <div className="appointment-card__date appointment-card__attribute mt-2">
            <FontAwesomeIcon icon={['far', 'calendar']} />
            {convertDateToString(new Date(date))}
          </div>
          <div className="appointment-card__time appointment-card__attribute mt-4">
            <FontAwesomeIcon icon="clock" />
            {displayDuration(startAt)}
          </div>
          <div className="appointment-card__price appointment-card__attribute mt-4">
            <FontAwesomeIcon icon="ruble-sign" />
            {price}
          </div>{' '}
        </>
      )}

      {children}
    </div>
  );
};

export default Appointment;
