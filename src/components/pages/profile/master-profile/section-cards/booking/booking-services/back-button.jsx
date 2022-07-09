import ChevronLeft from '../../../../../../base/icons/chevron-left';

const BackButton = ({ onClickClose }) => (
  <button type="button" onClick={onClickClose} className="booking-services__btn-back">
    <ChevronLeft /> Вернуться к выбору времени
  </button>
);

export default BackButton;
