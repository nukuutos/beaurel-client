import ArrowLeft from '../icons/arrow-left';

const MobileModalHeading = ({ onClickClose, title }) => (
  <nav className="modal__back-bar card card--layout">
    <div className="back-bar__main">
      <ArrowLeft onClick={onClickClose} className="back-bar__icon mr-6" />
      {title}
    </div>
  </nav>
);

export default MobileModalHeading;
