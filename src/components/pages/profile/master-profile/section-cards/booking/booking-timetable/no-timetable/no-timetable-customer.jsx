import { useSelector } from 'react-redux';
import Modal from '../../../../../../../base/modal/modal';
import MobileModalHeading from '../../../../../../../base/modal/mobile-modal-heading';

const NoTimetableCustomer = () => {
  const { isPhone } = useSelector((state) => state.screenSize);
  const onClickClose = () => null;

  return (
    <Modal onClickClose={onClickClose}>
      <div className={`no-master-tools ${isPhone ? '' : 'card'}`}>
        {isPhone && <MobileModalHeading title="Записаться" onClickClose={onClickClose} />}

        <img
          className="no-master-tools__svg"
          alt="Not able to book time"
          src="/svg/not-able-to-booking.svg"
        />

        <p className="no-master-tools__text no-master-tools__text--customer">
          Невозможно записаться к мастеру
        </p>

        <div className="no-master-tools__sad-smile">:(</div>
      </div>
    </Modal>
  );
};

export default NoTimetableCustomer;
