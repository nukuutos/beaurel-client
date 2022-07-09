import React from 'react';
import { useSelector } from 'react-redux';
import MobileModalHeading from '../../../../../../base/modal/mobile-modal-heading';

const NoToolCustomer = ({ title, svgSrc, onClickClose, children }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <div className={`no-master-tools ${isPhone ? '' : 'card'}`}>
      {isPhone && <MobileModalHeading title={title} onClickClose={onClickClose} />}

      <img className="no-master-tools__svg" alt="Not able to book time" src={svgSrc} />

      <p className="no-master-tools__text no-master-tools__text--customer">{children}</p>

      <div className="no-master-tools__sad-smile">:(</div>
    </div>
  );
};

export default NoToolCustomer;
