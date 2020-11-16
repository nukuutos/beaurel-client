import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useKey from '../../hooks/useKey';

const Modal = ({ children, onClickClose }) => {
  useKey(onClickClose);

  return (
    <div className="modal">
      {children}
      <FontAwesomeIcon onClick={onClickClose} className={'modal__close'} icon="times" />
    </div>
  );
};

export default Modal;
