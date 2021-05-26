import React from 'react';
import Modal from '../utils/modal';

const UpdateSuccess = () => {
  return (
    <Modal onClickClose={null}>
      <div className="update-success card">
        <h2 className="update-success__heading heading">Успешно</h2>
        <p className="update-success__text-success mt-6">Ваше расписение успешно обновлено!</p>

        {/* if services */}
        {/* <p className="mt-6">Необходимо обновить длительность услуг!</p>
        <p className="mt-2">Количество услуг: 3</p>
        <p className="update-success__danger mt-2">Иначе услуги будут недоступны!</p>
        <div className="update-success__btn btn btn--primary mt-6">Обновить услуги</div> */}
        {/* else */}
        <div className="update-success__btn btn btn--primary mt-6">Завершить</div>
      </div>
    </Modal>
  );
};

export default UpdateSuccess;
