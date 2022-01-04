import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ChoiceCards = ({ resetProgress, goNext, state }) => {
  const [isCustomer, setIsCustomer] = state;

  const getClassName = (state, value) => {
    let className = 'choice-card';
    if (state === value) className += ' choice-card--active';
    return className;
  };

  const customerClassName = getClassName(isCustomer, true);
  const masterClassName = getClassName(isCustomer, false);

  const setMaster = () => {
    resetProgress();
    setIsCustomer(false);
  };

  const setCustomer = () => {
    resetProgress();
    setIsCustomer(true);
  };

  return (
    <>
      <h2 className="sign-up__heading">Как будете использовать Beautify?</h2>
      <div className="sign-up__choice-cards">
        <div onClick={setCustomer} className={`${customerClassName}`}>
          <FontAwesomeIcon className="choice-card__icon" icon="user-alt" />
          <h4 className="choice-card__heading mt-3">Клиент</h4>
          <p className="choice-card__description mt-3">Находите мастеров и записывайтесь!</p>
        </div>

        <div onClick={setMaster} className={masterClassName}>
          <FontAwesomeIcon className="choice-card__icon" icon="address-card" />
          <h4 className="choice-card__heading mt-3">Мастер</h4>
          <p className="choice-card__description mt-3">Клиенты ждут ваших услуг!</p>
        </div>

        <div onClick={goNext} className="sign-up__btn btn btn--primary">
          Продолжить
        </div>
      </div>
    </>
  );
};

export default ChoiceCards;
