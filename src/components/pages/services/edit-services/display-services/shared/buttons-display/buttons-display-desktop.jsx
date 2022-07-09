import Pen from '../../../../../../base/icons/pen';
import Trash from '../../../../../../base/icons/trash';

const ButtonsDisplayDesktop = ({ deleteService, toEditing }) => (
  <>
    <div onClick={toEditing} className="service__btn  service__btn--first btn-icon">
      <Pen />
    </div>
    <div onClick={deleteService} className="service__btn btn-icon btn-icon--fail">
      <Trash />
    </div>
  </>
);

export default ButtonsDisplayDesktop;
