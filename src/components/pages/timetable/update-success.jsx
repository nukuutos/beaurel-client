import React from 'react';
import useMediaQuery from '../../../hooks/use-media-query';
import ModalHeading from '../../base/modal/modal-heading';

const UpdateSuccess = ({ setUpdateTimetable, servicesCountToUpdate }) => {
  const isPhone = useMediaQuery(600);

  return (
    <div className={`update-success ${isPhone ? '' : 'card'}`}>
      {/* <h2 className="update-success__heading heading">Успешно</h2> */}
      <ModalHeading
        title="Успешно"
        onClickClose={() =>
          setUpdateTimetable((state) => ({ ...state, isVisible: false, step: 0 }))
        }
        titleDesktopClassName="update-success__heading"
      />
      <p className="update-success__text-success">Ваше расписение успешно обновлено!</p>

      <p className="mt-6">Необходимо обновить длительность услуг!</p>
      <p className="mt-2">Количество услуг: {servicesCountToUpdate}</p>
      <p className="update-success__danger mt-2">Иначе услуги будут недоступны!</p>
      <div
        onClick={() => setUpdateTimetable((state) => ({ ...state, step: 2 }))}
        className="update-success__btn btn btn--primary mt-6"
      >
        Обновить услуги
      </div>
    </div>
  );
};

export default UpdateSuccess;
