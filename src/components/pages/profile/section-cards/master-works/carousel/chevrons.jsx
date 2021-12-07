import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const Chevrons = ({ toNextWork, toPrevWork }) => (
  <>
    <button
      type="button"
      onClick={toPrevWork}
      className="carousel__chevron carousel__chevron--left"
    >
      <FontAwesomeIcon icon="chevron-left" />
    </button>
    <button
      type="button"
      onClick={toNextWork}
      className="carousel__chevron carousel__chevron--right"
    >
      <FontAwesomeIcon icon="chevron-right" />
    </button>
  </>
);

export default Chevrons;
