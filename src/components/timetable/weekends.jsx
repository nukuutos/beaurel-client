import React, { useState } from 'react';
import { FieldArray, insert } from 'formik';
import Modal from '../utils/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const weekdaysRU = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

// unshift and insert
const insertElementInSortedArray = (value, array, insert) => {
  // insertion if array length === 0
  if (array.length === 0) {
    insert(0, value);
    return;
  }

  // insertion(from 0 to n-1) if array has elements
  for (let i = 0; i < array.length; i++) {
    const nextElement = array[i];
    if (value < nextElement && i === 0) {
      insert(0, value);
      return;
    }

    if (value < nextElement) {
      insert(i, value);
      return;
    }
  }

  // insertion to the end of the array(n);
  insert(array.length, value);
};

const Weekends = ({ weekends, update, editParentState, initialValues, setFieldValue }) => {
  // const [isModalWeekends, setIsModalWeekends] = useState(false);
  const [editState, setEditState] = editParentState;
  const { isEditing, element } = editState;
  const isDisabled = update || (isEditing && !element.weekends);

  return (
    <>
      <label className="timetable-card__label  mt-5">Выхоные:</label>
      {/* modal with checks, value as a array */}
      <span className="timetable-card__value ml-1 mt-5">
        {/* {weekends.length
          ? weekends.map((russionWeekdayName) => translateWeekdaysFromEN[russionWeekdayName]).join(' ')
          : '-'} */}
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
                <h2 className="weekends__heading heading-primary">Выходные</h2>
                <p className="weekends__text mt-6">Выбери свои выходные!</p>

                <div className="weekends__days">
                  {weekdaysRU.map((russianWeekdayName, weekdayIndex) => {
                    // const weekday = translateWeekdaysFromRU[russianWeekdayName];

                    const onPop = {
                      onClick: () => remove(weekends.indexOf(weekdayIndex)),
                      className: 'btn--success',
                    };

                    // const onPush = { onClick: () => push(weekdayIndex), className: 'btn--secondary' };
                    const onPush = {
                      onClick: () => insertElementInSortedArray(weekdayIndex, weekends, insert),
                      className: 'btn--secondary',
                    }; // it's not working because of gotten values
                    // we need to analyze array and choose index to insert

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
          className="timetable-card__btn-edit btn--edit">
          <FontAwesomeIcon icon="pen" />
        </div>
      )}
    </>
  );
};

export default Weekends;
