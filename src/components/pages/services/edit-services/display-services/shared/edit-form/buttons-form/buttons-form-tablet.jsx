import Check from '../../../../../../../base/icons/check';
import Cross from '../../../../../../../base/icons/cross';

const ButtonsTablet = ({ confirmChanges, cancelChanges }) => (
  <div className="service__mobile-buttons">
    <div onClick={cancelChanges} className="service__btn">
      Отменить
      <Cross />
    </div>
    <div onClick={confirmChanges} className="service__btn service__btn--confirm">
      Подтвердить
      <Check />
    </div>
  </div>
);

export default ButtonsTablet;
