import React from 'react';

const AppointmentsCategoriesController = ({ categoryState }) => {
  const [category, setCategory] = categoryState;

  return (
    <h2 className="appointments__appointment-types appointment-types card mt-8">
      <span
        onClick={() => setCategory('onConfirmation')}
        className={`appointment-types__type ${
          category === 'onConfirmation' ? 'appointment-types__type--active appointment-types__type--waiting' : ''
        }`}>
        ожидают
      </span>
      <span
        onClick={() => setCategory('confirmed')}
        className={`appointment-types__type ${
          category === 'confirmed' ? 'appointment-types__type--active appointment-types__type--confirmed' : ''
        }`}>
        подтверждены
      </span>
      <span
        onClick={() => setCategory('unsuitable')}
        className={`appointment-types__type ${
          category === 'unsuitable' ? 'appointment-types__type--active appointment-types__type--unsuitable' : ''
        }`}>
        неподходящие
      </span>
      <span
        onClick={() => setCategory('history')}
        className={`appointment-types__type ${
          category === 'history' ? 'appointment-types__type--active appointment-types__type--history' : ''
        }`}>
        история
      </span>
    </h2>
  );
};

export default AppointmentsCategoriesController;
