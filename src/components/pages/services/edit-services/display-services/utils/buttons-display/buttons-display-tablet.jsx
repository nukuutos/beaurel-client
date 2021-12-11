import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonsDisplayTablet = ({ deleteService, toEditing }) => (
  <div className="service__mobile-buttons">
    <div onClick={deleteService} className="service__btn">
      Удалить
      <FontAwesomeIcon icon="trash" />
    </div>
    <div onClick={toEditing} className="service__btn">
      Изменить
      <FontAwesomeIcon icon="pen" />
    </div>
  </div>
);

export default ButtonsDisplayTablet;
