import React from 'react';
import { useSelector } from 'react-redux';
import MobileModalHeading from './mobile-modal-heading';

const ModalHeading = ({ title, onClickClose, titleDesktopClassName = '' }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? (
    <MobileModalHeading title={title} onClickClose={onClickClose} />
  ) : (
    <h2 className={`heading heading--modal ${titleDesktopClassName}`}>{title}</h2>
  );
};

export default ModalHeading;
