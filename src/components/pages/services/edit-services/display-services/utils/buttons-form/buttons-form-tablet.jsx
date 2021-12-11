import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonsTablet = ({ confirmChanges, cancelChanges }) => (
  <div className="service__mobile-buttons">
    <div onClick={cancelChanges} className="service__btn">
      Отменить
      <FontAwesomeIcon icon="times" />
    </div>
    <div onClick={confirmChanges} className="service__btn service__btn--confirm">
      Подтвердить
      <FontAwesomeIcon icon="check" />
    </div>
  </div>
);

export default ButtonsTablet;
