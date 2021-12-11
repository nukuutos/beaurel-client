import React from 'react';
import useSwitch from './use-switch';

const Switch = ({ currentTabState }) => {
  const { goTo, classNames } = useSwitch(currentTabState);
  const { goToDisplay, goToReorder } = goTo;
  const { displayClassName, reorderClassName } = classNames;

  return (
    <div className="services__reorder-controller reorder-controller mt-6">
      Изменить
      <span onClick={goToDisplay} className={displayClassName}>
        услуги
      </span>
      /
      <span onClick={goToReorder} className={reorderClassName}>
        порядок
      </span>
    </div>
  );
};

export default Switch;
