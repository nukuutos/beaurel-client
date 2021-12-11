import React from 'react';
import useUpdateDate from './utils/use-update-date';

const UpdateDateAlert = ({ openServicesUpdates }) => {
  const updateDate = useUpdateDate();

  return (
    <div className="services__update-alert update-alert mt-6">
      <p className="update-alert__text">
        Ваши услуги с <span className="update-alert__date">{updateDate}</span>
      </p>
      <button
        type="button"
        onClick={openServicesUpdates}
        className="update-alert__button btn btn--secondary btn--flat ml-5"
      >
        Посмотреть
      </button>
    </div>
  );
};

export default UpdateDateAlert;
