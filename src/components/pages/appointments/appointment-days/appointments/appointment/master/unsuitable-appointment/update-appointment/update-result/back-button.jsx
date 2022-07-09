import React from 'react';

import ChevronLeft from '../../../../../../../../../base/icons/chevron-left';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <ChevronLeft /> Вернуться к выбору даты и времени
  </button>
);

export default BackButton;
