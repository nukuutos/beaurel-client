import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useKey from '../../../hooks/use-key';
import { setModalCloseFunction } from '../../../redux/modal/actions';
import useBlockScroll from '../use-block-scroll';

const Modal = ({ children, closeOnTouch = false, className = '', onClickClose = null }) => {
  const dispatch = useDispatch();
  const { isPhone, isTabLand, isTabPort } = useSelector((state) => state.screenSize);

  useKey(onClickClose);
  useBlockScroll('body');

  const needToCloseOnAction = closeOnTouch || isTabLand || isTabPort;

  const handleClickOnBackground = needToCloseOnAction ? onClickClose : null;

  useEffect(() => {
    dispatch(setModalCloseFunction(onClickClose));
    return () => dispatch(setModalCloseFunction(null));
  }, []);

  return (
    <div className={`modal ${className} ${isPhone ? 'modal--mobile' : ''}`}>
      <div onClick={handleClickOnBackground} className="modal__background" />
      {children}
      {!isPhone && <FontAwesomeIcon onClick={onClickClose} className="modal__close" icon="times" />}
    </div>
  );
};

export default Modal;
