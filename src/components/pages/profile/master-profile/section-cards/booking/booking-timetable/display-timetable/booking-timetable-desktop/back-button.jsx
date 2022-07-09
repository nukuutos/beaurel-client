import React from 'react';

import ChevronLeft from '../../../../../../../../base/icons/chevron-left';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back mb-4">
    <ChevronLeft /> Вернуться к выбору услуги
  </button>
);

export default BackButton;
