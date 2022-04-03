import { ErrorMessage } from 'formik';
import React from 'react';
import Select from '../../../../../../base/form/select';
import Modal from '../../../../../../base/modal/modal';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import DurationOptions from '../../../../utils/duration-options';

const EditWorkingDayPhone = ({ handleClicks, handleChange, validateField, errors }) => {
  const [handleEdit, handleCancel] = handleClicks;
  const { endAt: endAtError } = errors.edit?.auto.workingDay || {};

  const validate = (event) => {
    handleChange(event);
    validateField('edit.auto.workingDay.startAt');
    validateField('edit.auto.workingDay.endAt');
  };

  return (
    <Modal>
      <div className="timetable-phone-edit-modal">
        <ModalHeading onClickClose={handleCancel} title="Рабочий день" />

        <span className="timetable-phone-edit-modal__label mt-6">
          Длительность Вашего рабочего дня:
        </span>

        <span className="timetable-card__value mt-6">
          <Select
            onChange={validate}
            className="timetable-card__select select mr-1"
            name="edit.auto.workingDay.startAt"
            as="select"
          >
            <DurationOptions duration={60} startAt={480} />
          </Select>
          -
          <Select
            onChange={validate}
            className="timetable-card__select select ml-1"
            name="edit.auto.workingDay.endAt"
            as="select"
          >
            <DurationOptions duration={60} startAt={480} />
          </Select>
        </span>

        {endAtError ? <div className="timetable-card__error error mt-1">{endAtError}</div> : null}

        <button
          type="button"
          onClick={endAtError ? null : handleEdit}
          className={`timetable-phone-edit-modal__button btn btn--primary ${
            endAtError ? 'btn--disabled' : ''
          } mt-6`}
        >
          Изменить
        </button>
      </div>
    </Modal>
  );
};

export default EditWorkingDayPhone;
