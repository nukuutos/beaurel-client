import Check from '../../../../../../../base/icons/check';
import Cross from '../../../../../../../base/icons/cross';

const ButtonsDesktop = ({ confirmChanges, cancelChanges }) => (
  <>
    <div
      onClick={confirmChanges}
      className="service__btn service__btn--first btn-icon btn-icon--success"
    >
      <Check />
    </div>
    <div onClick={cancelChanges} className="service__btn btn-icon btn-icon--fail">
      <Cross />
    </div>
  </>
);

export default ButtonsDesktop;
