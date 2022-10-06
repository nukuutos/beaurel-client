import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAlert } from '../../redux/slices/alerts';
import ExclamationTriangle from '../base/icons/exclamation-triangle';

const Alert = ({ message }) => (
  <div className="alert card">
    <ExclamationTriangle className="alert__icon" />
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
    let time;

    if (alerts.length) {
      time = setTimeout(() => {
        dispatch(deleteAlert());
      }, 4000);
    }

    return () => clearTimeout(time);
  }, [alerts.length, dispatch]);

  return (
    <div className="alerts">
      {alerts?.map(({ message, id }) => (
        <Alert message={message} key={id} />
      ))}
    </div>
  );
};

export default Alerts;
