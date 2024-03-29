import { FieldArray } from 'formik';
import React from 'react';
import Plus from '../../../../../base/icons/plus';
import displayDuration from '../../../../utils/display-duration';

const DisplayDay = ({ getOpenModal, values, weekdayName, index }) => {
  const { appointments } = values.manually;
  const day = appointments[index];

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
                <span onClick={onClick} key={time} className="weekday__time mt-5">
                  {displayDuration(time)}
                </span>
              );
            })}
            <span onClick={openModal} className="weekday__time weekday__time--add mt-5">
              <Plus />
            </span>
          </div>
        </div>
      )}
    />
  );
};

export default DisplayDay;
