import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import ChevronRight from '../../../../../../base/icons/chevron-right';
import MobileModalHeading from '../../../../../../base/modal/mobile-modal-heading';

const NoTimetableMaster = ({ onClickClose }) => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const router = useRouter();
  const goToTimetable = () => router.push('/timetable');

  return (
    <div className="no-master-tools">
      {isPhone && <MobileModalHeading title="Расписание" onClickClose={onClickClose} />}

      <img
        className="no-master-tools__svg"
        alt="Not able to book time"
        src="/svg/not-able-to-booking.svg"
      />

      <p className="no-master-tools__text no-master-tools__text--center mt-9">
        Необходимо создать расписание,{!isPhone && <br />} чтобы клиенты смогли осуществить
        {!isPhone && <br />} запись к Вам
        <br />
        <span onClick={goToTimetable} className="btn-text btn-text--visit mt-5">
          Создать расписание <ChevronRight />
        </span>
      </p>
    </div>
  );
};

export default NoTimetableMaster;
