import React from 'react';

import ChevronLeft from '../../../../base/icons/chevron-left';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <ChevronLeft /> Назад
  </button>
);

export default BackButton;
