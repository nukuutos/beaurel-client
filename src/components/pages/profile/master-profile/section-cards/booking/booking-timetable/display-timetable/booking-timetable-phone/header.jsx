import ArrowLeft from '../../../../../../../../base/icons/arrow-left';

const Header = ({ onClickBack }) => (
  <nav className="modal__back-bar card card--layout">
    <div className="back-bar__main">
      <ArrowLeft onClick={onClickBack} className="back-bar__icon mr-6" />
      Выберите время
    </div>
  </nav>
);

export default Header;
