import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import displayDuration from '../../../../services/utils/display-duration';

const DisplayWorkingDay = ({ editState, values, isDisabled }) => {
  const { startAt, endAt } = values.auto.workingDay;
  const [state, setState] = editState;

  const openEditModal = () => {
    setState({ isEditing: true, element: { ...state.element, workingDay: true } });
  };

  const stringStartAt = displayDuration(startAt);
  const stringEndAt = displayDuration(endAt);

  return (
    <>
      <span className="timetable-card__value ml-1 mt-5">{`${stringStartAt} - ${stringEndAt}`}</span>
      {!isDisabled && (
        <div
          onClick={openEditModal}
          className="timetable-card__btn-edit timetable-card__btn-edit--bottom btn-icon"
        >
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </>
  );
};

export default DisplayWorkingDay;
