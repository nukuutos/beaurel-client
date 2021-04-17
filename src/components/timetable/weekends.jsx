import React, { useState } from 'react';
import { FieldArray, insert } from 'formik';
import Modal from '../utils/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import insertElementInSortedArray from './utils/insert-element-in-sorted-array';
import weekdaysRU from './utils/weekdays-ru';

const Weekends = ({ weekends, update, editParentState, initialValues, setFieldValue }) => {
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.weekends);

  return (
    <>
      <label className="timetable-card__label  mt-5">Выхоные:</label>
      <span className="timetable-card__value ml-1 mt-5">
        {weekends.length ? weekends.map((weekdayNum) => weekdaysRU[weekdayNum]).join(' ') : '-'}
      </span>

      {element.weekends && (
        <FieldArray
          name="auto.weekends"
          render={({ remove, insert }) => (
            <Modal
              onClickClose={() => {
                setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                setFieldValue('auto.weekends', initialValues.auto.weekends);
              }}>
              <div className="weekends card">
                <h2 className="weekends__heading heading">Выходные</h2>
                <p className="weekends__text mt-6">Выбери свои выходные!</p>

                <div className="weekends__days">
                  {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
                    const onPop = {
                      onClick: () => remove(weekends.indexOf(weekdayIndex)),
                      className: 'btn--success',
                    };

                    const onPush = {
                      onClick: () => insertElementInSortedArray(weekdayIndex, weekends, insert),
                      className: 'btn--secondary',
                    };

                    const { onClick, className } = weekends.includes(weekdayIndex) ? onPop : onPush;

                    return (
                      <div
                        name={`auto.weekends.${weekdayIndex}`}
                        className={`weekends__day btn mt-6 ${className}`}
                        onClick={onClick}
                        key={weekdayIndex}>
                        {russianWeekdayName.toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                <div
                  onClick={() => {
                    setEditState({ isEditing: false, element: { ...editState, weekends: false } });
                  }}
                  className="weekends__button btn btn--primary mt-6">
                  Изменить
                </div>
              </div>
            </Modal>
          )}
        />
      )}

      {!isDisabled && (
        <div
          onClick={() => setEditState({ isEditing: true, element: { ...editState, weekends: true } })}
          className="timetable-card__btn-edit btn-icon">
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </>
  );
};

export default Weekends;
