import React, { useState, useEffect } from 'react';
import AddServiceForm from './add-service-form';
import AddSubServicesForm from './add-sub-services-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableStart } from '../../../../redux/timetable/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddService = ({ setIsAddService }) => {
  const [serviceType, setServiceType] = useState('service'); // service or subservice
  const { sessionTime } = useSelector((state) => state.timetable);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionTime) dispatch(getTimetableStart());
  }, []);

  return (
    <div className="services__container">
      <div
        onClick={() => setIsAddService(false)}
        className="service__icon service__icon--manage ml-m mt-s service__icon--back">
        <FontAwesomeIcon icon="long-arrow-alt-left" />
      </div>
      <h2 className="services__heading mb-m">Add new service</h2>
      <div className="service__switch mb-m">
        <label className="service__label">Parameters</label>
        <div className="switch">
          <label
            className={`switch__label ${serviceType === 'service' && 'switch__label--active'}`}
            htmlFor="service"
            onClick={() => setServiceType('service')}>
            No
          </label>
          <label
            className={`switch__label ${serviceType === 'parameter' && 'switch__label--active'}`}
            htmlFor="service-parameter"
            onClick={() => setServiceType('parameter')}>
            Yes
          </label>
        </div>
        {/* forms */}
      </div>
      {serviceType === 'service' ? <AddServiceForm /> : <AddSubServicesForm />}
    </div>
  );
};

export default AddService;
