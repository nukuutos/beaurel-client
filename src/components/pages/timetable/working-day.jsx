import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Select from '../../base/form/select';
import renderDurationOptions from '../services/utils/render-duration-options';
import displayDuration from '../services/utils/display-duration';
import Modal from '../../base/modal';
import useKeys from '../../../hooks/use-keys';

const MobileEditWorkingDay = ({ onClickCancel, onClickSave, sessionTime }) => (
  <Modal isMobileBackground>
    <div className="timetable-phone-edit-modal">
      <nav className="modal__back-bar card card--layout">
        <div className="back-bar__main">
          <FontAwesomeIcon
            onClick={onClickCancel}
            className="back-bar__icon mr-6"
            icon="arrow-left"
          />
          Рабочий день
        </div>
      </nav>

      {/* <h2 className="timetable-phone-edit-modal__heading heading">Рабочий день</h2> */}
      {/* <div className="timetable-phone-edit-modal__group"> */}
      <label className="timetable-phone-edit-modal__label mt-6">
        Длительность Вашего рабочего дня:
      </label>
      <span className="timetable-card__value mt-6">
        <Select
          className="timetable-card__select select mr-1"
          name="edit.auto.workingDay.startAt"
          as="select"
        >
          {renderDurationOptions(sessionTime)}
        </Select>
        -
        <Select
          className="timetable-card__select select ml-1"
          name="edit.auto.workingDay.endAt"
          as="select"
        >
          {renderDurationOptions(sessionTime)}
        </Select>
      </span>
      {/* </div> */}
      <button
        onClick={onClickSave}
        className="timetable-phone-edit-modal__button btn btn--primary mt-6"
      >
        Изменить
      </button>
      {/* <button onClick={onClick} className={`timetable-phone-edit-modal__button btn btn--primary btn--gray mt-4`}>
        Отменить
      </button> */}
    </div>
  </Modal>
);

const EditWorkingDay = ({ onClickCancel, onClickSave, sessionTime }) => {
  const keys = () => [
    { key: 'Enter', fn: onClickSave },
    { key: 'Escape', fn: onClickCancel },
  ];

  useKeys(keys);

  return (
    <>
      <span className="timetable-card__value ml-1 mt-5 ">
        <Select
          className="timetable-card__select select mr-1"
          name="edit.auto.workingDay.startAt"
          as="select"
        >
          {renderDurationOptions(sessionTime)}
        </Select>
        -
        <Select
          className="timetable-card__select select ml-1"
          name="edit.auto.workingDay.endAt"
          as="select"
        >
          {renderDurationOptions(sessionTime)}
        </Select>
      </span>
      <div
        onClick={onClickSave}
        className="timetable-card__btn-edit--primary btn-icon btn-icon--success timetable-card__btn-edit--bottom"
      >
        <FontAwesomeIcon icon="check" />
      </div>
      <div
        onClick={onClickCancel}
        className="timetable-card__btn-edit btn-icon btn-icon--fail timetable-card__btn-edit--bottom"
      >
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

const renderWorkingDay = (isPhone, onClickCancel, sessionTime, onClickSave) =>
  isPhone ? (
    <MobileEditWorkingDay
      onClickCancel={onClickCancel}
      onClickSave={onClickSave}
      sessionTime={Number(sessionTime)}
    />
  ) : (
    <EditWorkingDay
      onClickCancel={onClickCancel}
      onClickSave={onClickSave}
      sessionTime={Number(sessionTime)}
    />
  );

const WorkingDay = ({
  workingDay,
  sessionTime,
  update,
  editParentState,
  setFieldValue,
  initialValues,
  edit,
}) => {
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.workingDay);
  const { isPhone } = useSelector((state) => state.screenSize);

  const onClickSave = () => {
    setFieldValue('auto.workingDay', edit.auto.workingDay);
    setEditState({ isEditing: false, element: { ...editState, workingDay: false } });
  };

  const onClickCancel = () => {
    setEditState({ isEditing: false, element: { ...editState, workingDay: false } });
  };

  return (
    <>
      <label className="timetable-card__label  mt-5">Рабочий день:</label>
      {element.workingDay ? (
        renderWorkingDay(isPhone, onClickCancel, sessionTime, onClickSave)
      ) : (
        <>
          <span className="timetable-card__value ml-1 mt-5">
            {`${displayDuration(workingDay.startAt)} - ${displayDuration(workingDay.endAt)}`}
          </span>
          {!isDisabled && (
            <div
              onClick={() => {
                setEditState({ isEditing: true, element: { ...editState, workingDay: true } });
              }}
              className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn-icon"
            >
              <FontAwesomeIcon icon="pen" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WorkingDay;
