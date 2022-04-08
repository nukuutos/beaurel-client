import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert } from '../../redux/alerts/actions';

const Alert = ({ message }) => (
  <div className="alert card">
    <FontAwesomeIcon icon="exclamation-triangle" className="alert__icon" />
    <div className="alert__body">
      <div className="alert__title">Ошибка</div>
      <div className="alert__message">{message}</div>
    </div>
  </div>
);

const Alerts = () => {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    const time = setTimeout(() => {
      dispatch(deleteAlert());
    }, 4000);

    return () => clearTimeout(time);
  }, [alerts.length, dispatch]);

  return (
    <div className="alerts">
      {alerts.map(({ message }) => (
        <Alert message={message} />
      ))}
    </div>
  );
};

export default Alerts;
