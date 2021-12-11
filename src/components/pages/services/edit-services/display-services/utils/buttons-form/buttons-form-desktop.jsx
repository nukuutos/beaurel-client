import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonsDesktop = ({ confirmChanges, cancelChanges }) => (
  <>
    <div
      onClick={confirmChanges}
      className="service__btn service__btn--first btn-icon btn-icon--success"
    >
      <FontAwesomeIcon icon="check" />
    </div>
    <div onClick={cancelChanges} className="service__btn btn-icon btn-icon--fail">
      <FontAwesomeIcon icon="times" />
    </div>
  </>
);

export default ButtonsDesktop;
