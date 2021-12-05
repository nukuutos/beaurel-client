import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = ({ onClickBack }) => (
  <nav className="modal__back-bar card card--layout">
    <div className="back-bar__main">
      <FontAwesomeIcon onClick={onClickBack} className="back-bar__icon mr-6" icon="arrow-left" />
      Выберите время
    </div>
  </nav>
);

export default Header;
