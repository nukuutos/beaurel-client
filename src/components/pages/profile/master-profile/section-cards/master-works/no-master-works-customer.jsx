import { useSelector } from 'react-redux';
import Modal from '../../../../../base/modal/modal';
import MobileModalHeading from '../../../../../base/modal/mobile-modal-heading';

const NoMasterWorksCustomer = ({ onClickClose }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return (
    <Modal onClickClose={onClickClose}>
      <div className={`no-master-tools ${isPhone ? '' : 'card'}`}>
        {isPhone && <MobileModalHeading title="Записаться" onClickClose={onClickClose} />}

        <img
          className="no-master-tools__svg"
          alt="No master works"
          src="/svg/no-master-works.svg"
        />

        <p className="no-master-tools__text no-master-tools__text--customer">
          Работы мастера отсутствуют
        </p>

        <div className="no-master-tools__sad-smile">:(</div>
      </div>
    </Modal>
  );
};

export default NoMasterWorksCustomer;
