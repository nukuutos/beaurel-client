import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import useKey from '../../hooks/use-key';
import useBlockScroll from './use-block-scroll';

const Modal = ({
  children,
  onClickClose = null,
  onBackgroundClose = null,
  isMobileBackground = false,
}) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  useKey(onClickClose);
  useBlockScroll('body');

  return (
    <div
      onClick={onBackgroundClose}
      className={`modal ${isPhone && isMobileBackground ? 'modal--mobile' : ''}`}
    >
      {children}
      {isPhone && isMobileBackground ? null : (
        <FontAwesomeIcon onClick={onClickClose} className="modal__close" icon="times" />
      )}
    </div>
  );
};

export default Modal;
