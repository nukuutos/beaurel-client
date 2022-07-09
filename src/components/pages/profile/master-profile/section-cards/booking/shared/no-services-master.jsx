import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ChevronRight from '../../../../../../base/icons/chevron-right';
import MobileModalHeading from '../../../../../../base/modal/mobile-modal-heading';

const NoServicesMaster = ({ onClickClose }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const router = useRouter();

  const goToServices = () => router.push('/services');

  return (
    <div className={`no-master-tools ${isPhone ? '' : 'card'}`}>
      {isPhone && <MobileModalHeading title="Услуги" onClickClose={onClickClose} />}

      <img
        className="no-master-tools__svg"
        alt="Not able to book time"
        src="/svg/no-services.svg"
      />

      <p className="no-master-tools__text no-master-tools__text--center mt-9">
        Необходимо создать услуги, {!isPhone && <br />} чтобы клиенты смогли осуществить{' '}
        {!isPhone && <br />} запись к Вам
        <br />
        <span onClick={goToServices} className="btn-text btn-text--visit mt-5">
          Создать услуги <ChevronRight />
        </span>
      </p>
    </div>
  );
};

export default NoServicesMaster;
