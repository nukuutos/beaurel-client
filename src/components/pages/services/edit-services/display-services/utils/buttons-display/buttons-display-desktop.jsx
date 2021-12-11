import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonsDisplayDesktop = ({ deleteService, toEditing }) => (
  <>
    <div onClick={toEditing} className="service__btn  service__btn--first btn-icon">
      <FontAwesomeIcon icon="pen" />
    </div>
    <div onClick={deleteService} className="service__btn btn-icon btn-icon--fail">
      <FontAwesomeIcon icon="trash" />
    </div>
  </>
);

export default ButtonsDisplayDesktop;
