import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back mb-4">
    <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору услуги
  </button>
);

export default BackButton;
