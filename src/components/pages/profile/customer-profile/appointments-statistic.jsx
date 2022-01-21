import React from 'react';
import { useSelector } from 'react-redux';

const AppointmentsStatistic = () => {
  const [{ reviewsCount }, { appointmentsCount, siblingAppointment }] = useSelector((state) => [
    state.profile,
    state.profile.appointmentsData,
  ]);

  const wrapperClassName = siblingAppointment
    ? 'profile__appointments-statistic--sibling-appointment'
    : '';

  const className = siblingAppointment ? 'appointments-statistic--sibling-appointment' : '';

  return (
    <div className={`profile__appointments-statistic ${wrapperClassName}`}>
      <div className={`appointments-statistic ${className} card`}>
        <div className="appointments-statistic__titles mr-5">
          <span className="appointments-statistic__title">Количество записей:</span>
          <span className="appointments-statistic__title mt-4">Количество отзывов:</span>
        </div>
        <div className="appointments-statistic__scores">
          <span className="appointments-statistic__score">{appointmentsCount}</span>
          <span className="appointments-statistic__score mt-4">{reviewsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsStatistic;
