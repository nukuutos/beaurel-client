import React from 'react';
import User from '../../base/icons/user';
import UserCard from '../../base/icons/user-card';

const ChoiceCards = ({ setMaster, setCustomer, goToNextStep, state }) => {
  const { user } = state;

  const getClassName = (user, value) => {
    let className = 'choice-card';
    if (user === value) className += ' choice-card--active';
    return className;
  };

  const customerClassName = getClassName(user, 'customer');
  const masterClassName = getClassName(user, 'master');

  return (
    <>
      <h2 className="sign-up__heading">Как будете использовать Beaurel?</h2>
      <div className="sign-up__choice-cards">
        <div onClick={setMaster} className={masterClassName}>
          <UserCard className="choice-card__icon" />
          <h3 className="choice-card__heading mt-3">Мастер</h3>
          <p className="choice-card__description mt-3">Клиенты ждут ваших услуг!</p>
        </div>
        <div onClick={setCustomer} className={customerClassName}>
          <User className="choice-card__icon" />
          <h3 className="choice-card__heading mt-3">Клиент</h3>
          <p className="choice-card__description mt-3">Находите мастеров и записывайтесь!</p>
        </div>
        <div onClick={goToNextStep} className="sign-up__btn btn btn--primary">
          Продолжить
        </div>
      </div>
    </>
  );
};

export default ChoiceCards;
