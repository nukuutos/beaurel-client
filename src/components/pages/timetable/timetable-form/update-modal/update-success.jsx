import React from 'react';
import { useSelector } from 'react-redux';
import ModalHeading from '../../../../base/modal/modal-heading';

const UpdateSuccess = ({ updateTimetableState }) => {
  const [{ servicesCountToUpdate }, setUpdateTimetable] = updateTimetableState;
  const { isPhone } = useSelector((state) => state.screenSize);

  const closeModal = () => setUpdateTimetable((state) => ({ ...state, isVisible: false, step: 0 }));
  const nextStep = () => setUpdateTimetable((state) => ({ ...state, step: 2 }));

  return (
    <div className={`update-success ${isPhone ? '' : 'card'}`}>
      <ModalHeading
        title="Успешно"
        onClickClose={closeModal}
        titleDesktopClassName="update-success__heading"
      />
      <p className="update-success__text-success">Ваше расписение успешно обновлено!</p>
      <p className="mt-6">Необходимо обновить длительность услуг!</p>
      <p className="mt-2">Количество услуг: {servicesCountToUpdate}</p>
      <p className="update-success__danger mt-2">Иначе услуги будут недоступны!</p>
      <div onClick={nextStep} className="update-success__btn btn btn--primary mt-6">
        Обновить услуги
      </div>
    </div>
  );
};

export default UpdateSuccess;
