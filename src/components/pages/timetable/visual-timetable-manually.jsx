import React, { useState } from 'react';
import { FieldArray } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import displayDuration from '../services/utils/display-duration';
import Modal from '../../base/modal';
import weekdaysRU from './utils/weekdays-ru';
import Select from '../../base/form/select';
import renderHours from './utils/render-hours';
import renderMins from './utils/render-mins';
import { setAlert } from '../../../redux/alert/actions';
import insertElementInSortedArrayWithSessionTimeCheck from './utils/insert-element-in-sorted-array-with-session-time-check';

const VisualTimetableManually = ({ values, update, isEditing }) => {
  const dispatch = useDispatch();
  const [isModal, setIsModal] = useState({ isOpen: false, weekdayIndex: null });
  const isDisabled = update || isEditing;

  const {
    sessionTime,
    manually: { hours, mins, appointments },
  } = values;

  return (
    <div className="timetable__timetable-card timetable-card mt-8 card">
      <div className="timetable-card__heading mb-2 ">Расписание</div>
      <div className="timetable-visual mt-4">
        {/* this data is based of sessionTime weekends and */}
        {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
          const {
            manually: { appointments },
          } = values;

          return (
            <FieldArray
              key={weekdayIndex}
              name={`manually.appointments[${weekdayIndex}]`}
              render={({ remove }) => (
                <div key={weekdayIndex} className="timetable-visual__weekday weekday">
                  <div className="weekday__name">{russianWeekdayName}</div>
                  <div className="weekday__appointments">
                    {appointments[weekdayIndex].map((time, i) => {
                      const onClick = () => remove(appointments[weekdayIndex].indexOf(time));

                      return (
                        <span
                          onClick={onClick}
                          key={i}
                          className={`weekday__time  ${isDisabled ? 'btn--disabled' : ''} mt-5`}
                        >
                          {displayDuration(time)}
                        </span>
                      );
                    })}
                    <span
                      onClick={() => setIsModal({ isOpen: true, weekdayIndex })}
                      className={`weekday__time ${
                        isDisabled ? 'btn--disabled' : ''
                      } weekday__time--add mt-5`}
                    >
                      <FontAwesomeIcon icon="plus" />
                    </span>
                  </div>
                </div>
              )}
            />
          );
        })}
        {/* i need to validate time when user add it */}
        {isModal.isOpen && (
          <FieldArray
            name={`manually.appointments[${isModal.weekdayIndex}]`}
            render={({ insert }) => (
              <Modal onClickClose={() => setIsModal({ isOpen: false, weekdayIndex: null })}>
                <div className="add-time card">
                  <h2 className="heading add-time__heading">Добавить время</h2>
                  <label className="add-time__label mt-6">День недели:</label>
                  <div className="add-time__value mt-6">
                    {weekdaysRU[isModal.weekdayIndex].toUpperCase()}
                  </div>

                  <label className="add-time__label mt-4">Время:</label>
                  {/* do timepicker */}
                  <div className="add-time__value mt-4">
                    <Select
                      value={hours}
                      className="select timetable-card__select mr-1"
                      name="manually.hours"
                      as="select"
                    >
                      {renderHours()}
                    </Select>
                    :
                    <Select
                      value={mins}
                      className="select timetable-card__select ml-1"
                      name="manually.mins"
                      as="select"
                    >
                      {renderMins()}
                    </Select>
                  </div>

                  <div
                    onClick={() => {
                      const value = Number(hours) + Number(mins);
                      // check value before insert
                      if (appointments[isModal.weekdayIndex].includes(value)) {
                        dispatch(
                          setAlert({
                            message: `Запись на такое время в этот день (${weekdaysRU[
                              isModal.weekdayIndex
                            ].toUpperCase()}) уже существует`,
                            type: 'fail',
                          })
                        );
                      } else {
                        insertElementInSortedArrayWithSessionTimeCheck(
                          value,
                          appointments[isModal.weekdayIndex],
                          insert,
                          sessionTime,
                          dispatch
                        );
                        setIsModal({ isOpen: false, weekdayIndex: null });
                      }
                    }}
                    className="btn btn--primary add-time__button mt-4"
                  >
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
