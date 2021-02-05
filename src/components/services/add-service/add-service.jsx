import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddServiceForm from './add-service-form';
import AddSubServicesForm from './add-service-parameter-form';
import { getTimetableStart } from '../../../redux/timetable/actions';

const AddService = () => {
  const [serviceType, setServiceType] = useState('service'); // service or subservice
  const { sessionTime } = useSelector((state) => state.timetable);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionTime) dispatch(getTimetableStart());
  }, []);

  return (
    <div className="add-service card">
      <h2 className="add-service__heading heading-primary">Добавить yслугу</h2>
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
