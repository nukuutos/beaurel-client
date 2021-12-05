import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import useMediaQuery from '../../../hooks/use-media-query';

const ModalHeading = ({ title, onClickClose, titleDesktopClassName = '' }) => {
  const isPhone = useMediaQuery(600);

  return isPhone ? (
    <nav className="modal__back-bar card card--layout">
      <div className="back-bar__main">
        <FontAwesomeIcon onClick={onClickClose} className="back-bar__icon mr-6" icon="arrow-left" />
        {title}
      </div>
    </nav>
  ) : (
    <h2 className={`heading heading--modal ${titleDesktopClassName}`}>{title}</h2>
  );
};

export default ModalHeading;
