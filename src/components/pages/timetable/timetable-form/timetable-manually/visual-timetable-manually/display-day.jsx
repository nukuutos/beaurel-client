import { FieldArray } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import Plus from '../../../../../base/icons/plus';
import displayDuration from '../../../../utils/display-duration';

const DisplayDay = ({ editState, getOpenModal, values, weekdayName, index }) => {
  const { isEditing } = editState;

  const { update } = useSelector((state) => state.timetable);
  const { appointments } = values.manually;
  const day = appointments[index];
  const isDisabled = update.date || isEditing;
  const disabledClassName = isDisabled ? 'btn--disabled' : '';
  const openModal = getOpenModal(index);

  return (
    <FieldArray
      key={weekdayName}
      name={`manually.appointments[${index}]`}
      render={({ remove }) => (
        <div className="timetable-visual__weekday weekday">
          <div className="weekday__name">{weekdayName}</div>
          <div className="weekday__appointments">
            {day.map((time) => {
              const onClick = () => {
                const indexToDelete = day.indexOf(time);
                remove(indexToDelete);
              };

              return (
                <span
                  onClick={onClick}
                  key={time}
                  className={`weekday__time ${disabledClassName} mt-5`}
                >
                  {displayDuration(time)}
                </span>
              );
            })}
            <span
              onClick={openModal}
              className={`weekday__time ${disabledClassName} weekday__time--add mt-5`}
            >
              <Plus />
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default DisplayDay;
