import React, { useState } from 'react';
import AddServiceForm from './add-service-form';
import AddSubServicesForm from './add-service-parameter-form';

const AddService = () => {
  const [serviceType, setServiceType] = useState('service'); // service or subservice

  // descrition: forms contain select element that must have value that is not null.
  // descrition: firstly isloading = false and only then we are dispatching sessionTime to store
  return (
    <div className="add-service card">
      <h2 className="add-service__heading heading">Добавить yслугу</h2>
      <div className="add-service__switch mt-7">
        <div className="add-service__switch-label">С параметрами</div>
        <div className="switch">
          <div
            className={`switch__label ${serviceType === 'service' ? 'switch__label--active' : ''}`}
            htmlFor="service"
            onClick={() => setServiceType('service')}>
            Нет
          </div>
          <div
            className={`switch__label ${serviceType === 'parameter' ? 'switch__label--active' : ''}`}
            htmlFor="service-parameter"
            onClick={() => setServiceType('parameter')}>
            Да
          </div>
        </div>
      </div>
      {serviceType === 'service' ? <AddServiceForm /> : <AddSubServicesForm />}
    </div>
  );
};

export default AddService;
