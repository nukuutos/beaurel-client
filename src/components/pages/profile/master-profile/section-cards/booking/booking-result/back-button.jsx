import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <FontAwesomeIcon icon="chevron-left" /> Назад
  </button>
);

export default BackButton;
