import React from 'react';
import Select from '../../../../../../base/form/select';
import Modal from '../../../../../../base/modal';
import HourOptions from '../../../../utils/hour-options';
import MinOptions from '../../../../utils/min-options';
import weekdaysRU from '../../../../utils/weekdays-ru';
import useHandleAdd from './use-handle-add';

const AddTime = ({ modalState, values, ...fieldArrayProps }) => {
  const [{ weekdayIndex: index }, setState] = modalState;
  const { hours, mins } = values.manually;

  const handleAdd = useHandleAdd({ values, modalState, index, ...fieldArrayProps });
  const weekday = weekdaysRU[index].toUpperCase();
  const closeModal = () => setState({ isOpen: false, weekdayIndex: null });

  return (
    <Modal onClickClose={closeModal}>
      <div className="add-time card">
        <h2 className="heading add-time__heading">Добавить время</h2>
        <span className="add-time__label mt-6">День недели:</span>
        <div className="add-time__value mt-6">{weekday}</div>

        <span className="add-time__label mt-4">Время:</span>

        <div className="add-time__value mt-4">
          <Select
            value={hours}
            className="select timetable-card__select mr-1"
            name="manually.hours"
            as="select"
          >
            <HourOptions />
          </Select>
          :
          <Select
            value={mins}
            className="select timetable-card__select ml-1"
            name="manually.mins"
            as="select"
          >
            <MinOptions />
          </Select>
        </div>

        <div onClick={handleAdd} className="btn btn--primary add-time__button mt-4">
          Добавить
        </div>
      </div>
    </Modal>
  );
};

export default AddTime;
