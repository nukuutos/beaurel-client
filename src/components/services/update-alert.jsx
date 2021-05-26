import React from 'react';

const UpdateAlert = () => {
  return true ? (
    <div className="services__update-alert update-alert update-alert--error mt-6">
      <p className="update-alert__text update-alert__text--error">Необходимо обновить длительность ваших услуг!</p>
      <button className="udpate-alert__button btn btn--primary btn--flat btn--fail ml-5">Обновить</button>
    </div>
  ) : (
    <div className="services__update-alert update-alert mt-6">
      <p className="update-alert__text">
        Ваши услуги с <span className="update-alert__date">24.05.2021</span>
      </p>
      <button className="udpate-alert__button btn btn--secondary btn--flat ml-5">Посмотреть</button>
    </div>
  );
};

export default UpdateAlert;
