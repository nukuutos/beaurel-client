import React, { useState } from 'react';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import displayDuration from '../services/utils/display-duration';
import Modal from '../utils/modal';
import Input from '../form/input';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const VisualTimetableManually = ({ values, update, isEditing }) => {
  const [isModal, setIsModal] = useState({ isOpen: false, weekdayIndex: null });
  const isDisabled = update || isEditing;

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
      <div className="timetable-visual mt-4">
        {/* this data is based of sessionTime weekends and */}
        {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
          const {
            manually: { appointments },
          } = values;

          // const weekday = translateWeekdaysFromRU[russianWeekdayName];

          return (
            <>
              <FieldArray
                key={weekdayIndex}
                name={`manually.appointments[${weekdayIndex}]`}
                render={({ remove }) => (
                  // <>
                  <div key={weekdayIndex} className="timetable-visual__weekday weekday">
                    <div className="weekday__name">{russianWeekdayName}</div>
                    <div className="weekday__appointments">
                      {appointments[weekdayIndex].map((time, i) => {
                        const onClick = () => remove(appointments[weekdayIndex].indexOf(time));

                        return (
                          <span
                            onClick={onClick}
                            key={i}
                            className={`weekday__time ${isEditing ? 'btn--disabled' : ''} mt-5`}>
                            {displayDuration(time)}
                          </span>
                        );
                      })}
                      <span
                        onClick={() => setIsModal({ isOpen: true, weekdayIndex })}
                        className={`weekday__time ${isDisabled ? 'btn--disabled' : ''} weekday__time--add mt-5`}>
                        <FontAwesomeIcon icon="plus" />
                      </span>
                    </div>
                  </div>
                  // </>
                )}
              />
            </>
          );
        })}
        {/* i need to validate time when user add it */}
        {isModal.isOpen && (
          <FieldArray
            name={`manually.appointments[${isModal.weekdayIndex}]`}
            render={({ push }) => (
              <Modal onClickClose={() => setIsModal({ isOpen: false, weekdayIndex: null })}>
                <div className="add-time card">
                  <h2 className="heading-primary add-time__heading">Добавить время</h2>
                  <label className="add-time__label mt-6">День недели:</label>
                  <div className="add-time__value mt-6">{weekdaysRU[isModal.weekdayIndex].toUpperCase()}</div>

                  <label className="add-time__label mt-4">Время:</label>
                  {/* do timepicker */}
                  <div className="add-time__value mt-4">
                    <Input name="manually.time" type="number" className="input" />
                  </div>

                  <div
                    onClick={() => {
                      push(values.manually.time);
                      setIsModal({ isOpen: false, weekdayIndex: null });
                    }}
                    className="btn btn--primary add-time__button">
                    Добавить
                  </div>
                </div>
              </Modal>
            )}
          />
        )}
      </div>
    </div>
  );
};

export default VisualTimetableManually;
