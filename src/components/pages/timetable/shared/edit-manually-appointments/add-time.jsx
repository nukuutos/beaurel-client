import React from 'react';
import Select from '../../../../base/form/select';
import Modal from '../../../../base/modal/modal';
import ModalHeading from '../../../../base/modal/modal-heading';
import HourOptions from '../../utils/hour-options';
import MinOptions from '../../utils/min-options';
import weekdaysRU from '../../utils/weekdays-ru';
import useHandleAdd from './use-handle-add/use-handle-add';

const AddTime = ({ state, closeModal, values, setFieldError, errors, ...fieldArrayProps }) => {
  const { weekdayIndex: index } = state;
  const { hours, mins } = values.manually;

  const handleAdd = useHandleAdd({
    closeModal,
    values,
    setFieldError,
    index,
    ...fieldArrayProps,
  });
  const weekday = weekdaysRU[index].toUpperCase();

  return (
    <Modal onClickClose={closeModal}>
      <div className="add-time">
        <ModalHeading
          titleDesktopClassName="add-time__heading"
          onClickClose={closeModal}
          title="Добавить время"
        />

        <span className="add-time__label">День недели:</span>
        <div className="add-time__value">{weekday}</div>

        <span className="add-time__label mt-4">Время:</span>

        <div className="add-time__value mt-4">
          <Select
            value={hours}
            className="select timetable-card__select mr-1"
            name="manually.hours"
            as="select"
          >
            <HourOptions startAt={480} endAt={1320} />
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

        {errors.manually?.hours && (
          <div className="error mt-1 add-time__error">{errors.manually.hours}</div>
        )}

        <div onClick={handleAdd} className="btn btn--primary add-time__button mt-4">
          Добавить
        </div>
      </div>
    </Modal>
  );
};

export default AddTime;
