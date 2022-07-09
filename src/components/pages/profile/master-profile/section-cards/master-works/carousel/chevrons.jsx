import React from 'react';
import ChevronLeft from '../../../../../../base/icons/chevron-left';
import ChevronRight from '../../../../../../base/icons/chevron-right';

const Chevrons = ({ toNextWork, toPrevWork }) => (
  <>
    <button
      type="button"
      onClick={toPrevWork}
      className="carousel__chevron carousel__chevron--left"
    >
      <ChevronLeft />
    </button>
    <button
      type="button"
      onClick={toNextWork}
      className="carousel__chevron carousel__chevron--right"
    >
      <ChevronRight />
    </button>
  </>
);

export default Chevrons;
