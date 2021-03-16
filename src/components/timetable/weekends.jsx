import React, { useState } from 'react';
import { FieldArray } from 'formik';
import Modal from '../utils/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const translateWeekdaysFromRU = { пн: 'mon', вт: 'tue', ср: 'wen', чт: 'thu', пт: 'fri', сб: 'sat', вс: 'sun' };
const translateWeekdaysFromEN = { mon: 'пн', tue: 'вт', wen: 'ср', thu: 'чт', fri: 'пт', sat: 'сб', sun: 'вс' };

const Weekends = ({ weekends }) => {
  const [isModalWeekends, setIsModalWeekends] = useState(false);

  return (
    <>
      <label className="timetable-card__label  mt-5">Выхоные:</label>
      {/* modal with checks, value as a array */}
      <span className="timetable-card__value ml-1 mt-5">
        {weekends.length
          ? weekends.map((russionWeekdayName) => translateWeekdaysFromEN[russionWeekdayName]).join(' ')
          : '-'}
      </span>

      {isModalWeekends && (
        <FieldArray
          name="auto.weekends"
          render={({ remove, push }) => (
            <Modal onClickClose={() => setIsModalWeekends(false)}>
              <div className="weekends card">
                <h2 className="weekends__heading heading-primary">Выходные</h2>
                <p className="weekends__text mt-6">Выбери свои выходные!</p>

                <div className="weekends__days">
                  {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((russianWeekdayName, i) => {
                    const weekday = translateWeekdaysFromRU[russianWeekdayName];

                    const onPop = {
                      onClick: () => remove(weekends.indexOf(weekday)),
                      className: 'btn--success',
                    };

                    const onPush = { onClick: () => push(weekday), className: 'btn--secondary' };

                    const { onClick, className } = weekends.includes(weekday) ? onPop : onPush;

                    return (
                      <div
                        name={`auto.weekends.${i}`}
                        className={`weekends__day btn mt-6 ${className}`}
                        onClick={onClick}
                        key={i}>
                        {russianWeekdayName.toUpperCase()}
                      </div>
                    );
                  })}
                </div>

                <div className="weekends__button btn btn--primary mt-6">Сохранить</div>
              </div>
            </Modal>
          )}
        />
      )}

      <div onClick={() => setIsModalWeekends(true)} className="timetable-card__btn-edit btn--edit">
        <FontAwesomeIcon icon="pen" />
      </div>
    </>
  );
};

export default Weekends;
