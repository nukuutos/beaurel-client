import React from 'react';

const UpdateAlert = ({ setIsUpdateServices }) => {
  return (
    <div className="services__update-alert update-alert update-alert--error mt-6">
      <p className="update-alert__text update-alert__text--error">Необходимо обновить длительность ваших услуг!</p>
      <button
        onClick={() => setIsUpdateServices((state) => ({ ...state, update: true }))}
        className="udpate-alert__button btn btn--primary btn--flat btn--fail ml-5">
        Обновить
      </button>
    </div>
  );
};

export default UpdateAlert;
