import React from 'react';
import Modal from '../utils/modal';
import Input from '../form/input';

const UpdatedDate = ({ setIsDatePicker, isLoading }) => {
  return (
    <Modal onClickClose={() => setIsDatePicker(false)}>
      <div className="updated-date card">
        <h2 className="updated-date__heading heading">Дата обновления</h2>
        <p className="updated-date__text mt-4">Выбери дату обновления расписания!</p>
        <Input name="date" className="updated-date__input input mt-4" />
        <button
          type="submit"
          className={`updated-date__button btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''} mt-6`}>
          Сохранить
        </button>
      </div>
    </Modal>
  );
};

export default UpdatedDate;
