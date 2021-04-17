import React from 'react';
import Select from '../form/select';
import renderDurationOptions from '../services/utils/render-duration-options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from '../services/utils/display-duration';

const WorkingDay = ({ workingDay, sessionTime, update, editParentState }) => {
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.workingDay);

  return (
    <>
      <label className="timetable-card__label  mt-5">Рабочий день:</label>
      {element.workingDay ? (
        <>
          <span className="timetable-card__value ml-1 mt-5 ">
            <Select className="timetable-card__select select mr-1" name="auto.workingDay.startAt" as="select">
              {renderDurationOptions(sessionTime)}
            </Select>
            -
            <Select className="timetable-card__select select ml-1" name="auto.workingDay.endAt" as="select">
              {renderDurationOptions(sessionTime)}
            </Select>
          </span>
          <div
            onClick={() => {
              setEditState({ isEditing: false, element: { ...editState, workingDay: false } });
            }}
            className="timetable-card__btn-edit--primary btn-icon btn-icon--success timetable-card__btn-edit--bottom">
            <FontAwesomeIcon icon="check" />
          </div>
          <div
            onClick={() => {
              setEditState({ isEditing: false, element: { ...editState, workingDay: false } });
            }}
            className="timetable-card__btn-edit btn-icon btn-icon--fail timetable-card__btn-edit--bottom">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
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
              className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn-icon">
              <FontAwesomeIcon icon="pen" />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default WorkingDay;
