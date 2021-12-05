import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-timetable__back-btn">
    <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору услуги
  </button>
);

export default BackButton;
