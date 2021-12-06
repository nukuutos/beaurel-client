import React from 'react';

const AppointmentsCategoriesController = ({ categoryState }) => {
  const [category, setState] = categoryState;

  return (
    <h2 className="appointments__appointment-types appointment-types card mt-8">
      <span
        onClick={() => setState((state) => ({ ...state, category: 'onConfirmation' }))}
        className={`appointment-types__type ${
          category === 'onConfirmation' ? 'appointment-types__type--active appointment-types__type--waiting' : ''
        }`}>
        ожидают
      </span>
      <span
        onClick={() => setState((state) => ({ ...state, category: 'confirmed' }))}
        className={`appointment-types__type ${
          category === 'confirmed' ? 'appointment-types__type--active appointment-types__type--confirmed' : ''
        }`}>
        подтверждены
      </span>
      <span
        onClick={() => setState((state) => ({ ...state, category: 'unsuitable' }))}
        className={`appointment-types__type ${
          category === 'unsuitable' ? 'appointment-types__type--active appointment-types__type--unsuitable' : ''
        }`}>
        неподходящие
      </span>
      <span
        onClick={() => setState((state) => ({ ...state, category: 'history' }))}
        className={`appointment-types__type ${
          category === 'history' ? 'appointment-types__type--active appointment-types__type--history' : ''
        }`}>
        история
      </span>
    </h2>
  );
};

export default AppointmentsCategoriesController;
