import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteServiceStart } from '../../../../../../redux/service/actions';

const DisplaySubService = ({ subService, isLastService, setIsEdit, title }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;

  return (
    <>
      <div className="service">
        <span
          className={`service__cell service__parameter ${isLastService ? 'service__parameter--last-parameter' : ''}`}>
          {parameter}
        </span>
        <span className="service__cell service__duration">{duration}</span>
        <span
          className={`service__cell service__price service__price--parameter ${
            isLastService ? 'service__price--last-parameter' : ''
          }`}>
          {price}
        </span>
      </div>
      <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage">
        <FontAwesomeIcon icon="pen" />
      </div>
      <div
        onClick={() => dispatch(deleteServiceStart({ type: 'sub-service', service: { id, title } }))}
        className="service__icon service__icon--manage">
        <FontAwesomeIcon icon="trash" />
      </div>
    </>
  );
};

export default DisplaySubService;
