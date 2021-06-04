import React from 'react';

const UpdateSuccess = ({ setUpdateTimetable, servicesCountToUpdate }) => {
  return (
    <div className="update-success card">
      <h2 className="update-success__heading heading">Успешно</h2>
      <p className="update-success__text-success mt-6">Ваше расписение успешно обновлено!</p>

      <p className="mt-6">Необходимо обновить длительность услуг!</p>
      <p className="mt-2">Количество услуг: {servicesCountToUpdate}</p>
      <p className="update-success__danger mt-2">Иначе услуги будут недоступны!</p>
      <div
        onClick={() => setUpdateTimetable((state) => ({ ...state, step: 2 }))}
        className="update-success__btn btn btn--primary mt-6">
        Обновить услуги
      </div>
    </div>
  );
};

export default UpdateSuccess;
