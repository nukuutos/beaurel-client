import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ChevronRight from '../../../../../../base/icons/chevron-right';
import MobileModalHeading from '../../../../../../base/modal/mobile-modal-heading';

const Unauthorized = ({ onClickClose, title, children }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const router = useRouter();
  const goToSignUp = () => router.push('/sign-up');

  return (
    <div className={`no-master-tools unauthorized ${isPhone ? '' : 'card'}`}>
      {isPhone && <MobileModalHeading title={title} onClickClose={onClickClose} />}

      <img className="no-master-tools__svg" alt="Unauthorized action" src="/svg/unauthorized.svg" />

      <p className="no-master-tools__text no-master-tools__text--center mt-9">
        {children}
        <br />
        <span onClick={goToSignUp} className="btn-text btn-text--visit mt-5">
          Зарегистрироваться <ChevronRight />
        </span>
      </p>
    </div>
  );
};

export default Unauthorized;
