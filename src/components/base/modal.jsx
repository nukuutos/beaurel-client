import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import useKey from '../../hooks/use-key';
import useBlockScroll from './use-block-scroll';

const Modal = ({
  children,
  onClickClose = null,
  onBackgroundClose = null,
  isMobileBackground = false,
  title = '',
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
      {/* desktop close */}
      {isPhone && isMobileBackground ? null : (
        <FontAwesomeIcon onClick={onClickClose} className="modal__close" icon="times" />
      )}
      {/* mobile close */}
      {/* {isPhone && isMobileBackground && (
        <nav className={`mobile-navbar card card--layout`}>
          <div className="mobile-navbar__main mobile-navbar__main--end">
            <li onClick={onClickClose} className="mobile-navbar__item mr-2">
              <FontAwesomeIcon className="mobile-navbar__icon mobile-navbar__icon--big" icon="arrow-left" />
            </li>
          </div>
        </nav>
      )} */}
      {/* {isPhone && isMobileBackground && (
        <nav className={`modal__back-bar card card--layout`}>
          <div className="back-bar__main">
            <li onClick={onClickClose} className="back-bar__item mr-2">
              <FontAwesomeIcon className="back-bar__icon" icon="arrow-left" />
              {title}
            </li>
          </div>
        </nav>
      )} */}
    </div>
  );
};

export default Modal;
