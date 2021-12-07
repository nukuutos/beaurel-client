import React from 'react';
import useMediaQuery from '../../../hooks/use-media-query';
import MobileModalHeading from './mobile-modal-heading';

const ModalHeading = ({ title, onClickClose, titleDesktopClassName = '' }) => {
  const isPhone = useMediaQuery(600);

  return isPhone ? (
    <MobileModalHeading title={title} onClickClose={onClickClose} />
  ) : (
    <h2 className={`heading heading--modal ${titleDesktopClassName}`}>{title}</h2>
  );
};

export default ModalHeading;
