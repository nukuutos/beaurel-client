import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MobileModalHeading = ({ onClickClose, title }) => (
  <nav className="modal__back-bar card card--layout">
    <div className="back-bar__main">
      <FontAwesomeIcon onClick={onClickClose} className="back-bar__icon mr-6" icon="arrow-left" />
      {title}
    </div>
  </nav>
);

export default MobileModalHeading;
