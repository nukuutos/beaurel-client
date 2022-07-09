import Pen from '../../../../../../base/icons/pen';
import Trash from '../../../../../../base/icons/trash';

const ButtonsDisplayTablet = ({ deleteService, toEditing }) => (
  <div className="service__mobile-buttons">
    <div onClick={deleteService} className="service__btn">
      Удалить
      <Trash />
    </div>
    <div onClick={toEditing} className="service__btn">
      Изменить
      <Pen />
    </div>
  </div>
);

export default ButtonsDisplayTablet;
