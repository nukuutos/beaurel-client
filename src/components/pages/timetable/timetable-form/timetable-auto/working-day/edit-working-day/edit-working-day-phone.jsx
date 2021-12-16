import React from 'react';
import Select from '../../../../../../base/form/select';
import Modal from '../../../../../../base/modal';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import DurationOptions from '../../../../utils/duration-options';

const EditWorkingDayPhone = ({ handleClicks }) => {
  const [handleEdit, handleCancel] = handleClicks;

  return (
    <Modal isMobileBackground>
      <div className="timetable-phone-edit-modal">
        <ModalHeading onClickClose={handleCancel} title="Рабочий день" />

        <span className="timetable-phone-edit-modal__label mt-6">
          Длительность Вашего рабочего дня:
        </span>

        <span className="timetable-card__value mt-6">
          <Select
            className="timetable-card__select select mr-1"
            name="edit.auto.workingDay.startAt"
            as="select"
          >
            <DurationOptions duration={60} />
          </Select>
          -
          <Select
            className="timetable-card__select select ml-1"
            name="edit.auto.workingDay.endAt"
            as="select"
          >
            <DurationOptions duration={60} />
          </Select>
        </span>

        <button
          type="button"
          onClick={handleEdit}
          className="timetable-phone-edit-modal__button btn btn--primary mt-6"
        >
          Изменить
        </button>
      </div>
    </Modal>
  );
};

export default EditWorkingDayPhone;
