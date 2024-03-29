import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { closeMasterTools } from '../../../redux/slices/master-tools';
import Modal from '../modal/modal';
import MobileModalHeading from '../modal/mobile-modal-heading';
import ChevronRight from '../icons/chevron-right';
import Check from '../icons/check';

const TimetableCase = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToTimetable = () => {
    dispatch(closeMasterTools());
    router.push('/timetable');
  };

  return (
    <>
      Для того, чтобы стать настоящим
      <br />
      мастером необходимо:
      <br />
      <span
        onClick={goToTimetable}
        className="no-master-tools__link btn-text btn-text--visit mt-2 mb-2"
      >
        1. Создать расписание <ChevronRight />
      </span>
      <br />
      2. <span className="ml-1">Создать услуги</span>
    </>
  );
};

const ServicesCase = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const goToServices = () => {
    dispatch(closeMasterTools());
    router.push('/services');
  };

  return (
    <>
      Остался последний пункт, и Вы -
      <br />
      настоящий Мастер:
      <br />
      <span className="no-master-tools__completed-step mt-2 mb-2">
        1. Создать расписание
        <Check />
      </span>
      <br />
      <span onClick={goToServices} className="no-master-tools__link btn-text btn-text--visit">
        2. Создать услуги <ChevronRight />
      </span>
    </>
  );
};

const NoMasterTools = () => {
  const [{ isServices, isTimetable }, { isPhone }] = useSelector((state) => [
    state.masterTools,
    state.screenSize,
  ]);
  const dispatch = useDispatch();
  const onClickClose = () => dispatch(closeMasterTools());

  return (
    <Modal onClickClose={onClickClose}>
      {isPhone && <MobileModalHeading title="Инструменты мастера" onClickClose={onClickClose} />}
      <div className="no-master-tools card">
        <img className="no-master-tools__svg" alt="Become master" src="/svg/become-master.svg" />

        <p className="no-master-tools__text mt-8">
          {!isServices && !isTimetable && <TimetableCase />}
          {!isServices && isTimetable && <ServicesCase />}
        </p>
      </div>
    </Modal>
  );
};

export default NoMasterTools;
