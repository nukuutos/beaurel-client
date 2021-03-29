import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from '../../services/utils/display-duration';
import useAsyncAction from '../../../hooks/useAsyncAction';
import { useSelector, useDispatch } from 'react-redux';
import { changeAppointmentStatus } from '../../../redux/appointments/actions';
import { setAlert } from '../../../redux/alert/actions';

const convertDateToString = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const stringDay = String(day).length === 2 ? day : '0' + day;
  const stringMonth = String(month).length === 2 ? month : '0' + month;
  const year = String(date.getFullYear());

  return stringDay + '.' + stringMonth + '.' + year[2] + year[3];
};

const Appointment = ({ appointment, children }) => {
  const { _id, service, customer, time, date, createdAt } = appointment;

  const { firstName, lastName, avatar, _id: customerId } = customer;
  const { title, duration, price } = service;
  const { startAt } = time;

  return (
    <div className="appointments__appointment-card appointment-card card mt-8">
      {/* <div className="appointment-card__avatar mb-2" /> */}
      <img src={`http://localhost:5000/${avatar}`} alt="Avatar Image" className="appointment-card__avatar mb-2" />
      <span className="appointment-card__name mt-2">{firstName + ' ' + lastName[0] + '.'}</span>
      <div className="appointment-card__header-line" />

      <span className="appointment-card__service mt-3">{title}</span>

      <div className="appointment-card__date appointment-card__attribute mt-2">
        <FontAwesomeIcon icon={['far', 'calendar']} />
        {/* {28.12.21} */}
        {convertDateToString(new Date(date), '.')}
      </div>
      <div className="appointment-card__time appointment-card__attribute mt-4">
        <FontAwesomeIcon icon="clock" />
        {displayDuration(startAt)}
      </div>
      <div className="appointment-card__price appointment-card__attribute mt-4">
        <FontAwesomeIcon icon="ruble-sign" />
        {price}
      </div>

      {children}
    </div>
  );
};

export default Appointment;
