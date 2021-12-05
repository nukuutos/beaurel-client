import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору времени
  </button>
);

export default BackButton;
