import React from 'react';
import CircleNotch from '../../../base/icons/circle-notch';
import Cogs from '../../../base/icons/cogs';

const ChoiceCards = ({ resetProgress, goNext, values, setFieldValue }) => {
  const { type } = values;

  const getClassName = (state, value) => {
    let className = 'choice-card';
    if (state === value) className += ' choice-card--active';
    return className;
  };

  const autoClassName = getClassName(type, 'auto');
  const manuallyClassName = getClassName(type, 'manually');

  const setAuto = () => {
    resetProgress();
    setFieldValue('type', 'auto');
  };

  const setManually = () => {
    resetProgress();
    setFieldValue('type', 'manually');
  };

  return (
    <>
      <h2 className="sign-up__heading">Как будете использовать Beaurel?</h2>
      <div className="create-timetable__choice-cards">
        <div onClick={setAuto} className={autoClassName}>
          <CircleNotch className="choice-card__icon" />
          <h4 className="choice-card__heading mt-3">Автоматический</h4>
          <p className="choice-card__description mt-3">
            Укажите время работы и выходные дни, исключите ненужные записи по необоходимости, и
            расписание готово!
          </p>
        </div>

        <div onClick={setManually} className={`mt-6 ${manuallyClassName}`}>
          <Cogs className="choice-card__icon" />
          <h4 className="choice-card__heading mt-3">Ручной</h4>
          <p className="choice-card__description mt-3">
            Укажите день недели и время - ваше время для записи готово!
          </p>
        </div>

        <div onClick={goNext} className="sign-up__btn btn btn--primary">
          Продолжить
        </div>
      </div>
    </>
  );
};

export default ChoiceCards;
