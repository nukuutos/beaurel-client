import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayService = ({ service, setIsEdit }) => {
  const { title, duration, price } = service;

  return (
    <>
      <div className="service" onClick={() => console.log(1)}>
        <span className="service__cell service__title">{title}</span>
        <span className="service__cell service__duration">{duration}</span>
        <span className="service__cell service__price">{price}</span>
      </div>
      <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage">
        <FontAwesomeIcon icon="pen" />
      </div>
      <div
        onClick={() => dispatch(deleteServiceStart({ service: { id }, type: 'service' }))}
        className="service__icon service__icon--manage">
        <FontAwesomeIcon icon="trash" /> {/* times */}
      </div>
    </>
  );
};

export default DisplayService;
