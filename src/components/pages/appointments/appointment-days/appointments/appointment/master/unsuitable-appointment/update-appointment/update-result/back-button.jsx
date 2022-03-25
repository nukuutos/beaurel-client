import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору даты и времени
  </button>
);

export default BackButton;
