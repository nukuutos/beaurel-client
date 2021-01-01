import React, { useState, useEffect } from 'react';
import AddServiceForm from './add-service-form';
import AddSubServicesForm from './add-service-parameter-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getTimetableStart } from '../../../../../../redux/timetable/actions';
import { useDispatch, useSelector } from 'react-redux';

const AddService = ({ setIsAddService }) => {
  const [serviceType, setServiceType] = useState('service'); // service or subservice
  const { sessionTime } = useSelector((state) => state.timetable);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionTime) dispatch(getTimetableStart());
  }, []);

  return (
    <main className="services">
      <div onClick={() => setIsAddService(false)} className="service__icon service__icon--manage service__icon--back">
        <FontAwesomeIcon icon="long-arrow-alt-left" />
      </div>
      <h2 className="services__heading gc-f mb-s-6">Add new service</h2>
      <div className="service__switch mb-s-6">
        <div className="service__label">Parameters</div>
        <div className="switch">
          <div
            className={`switch__label ${serviceType === 'service' && 'switch__label--active'}`}
            htmlFor="service"
            onClick={() => setServiceType('service')}>
            No
          </div>
          <div
            className={`switch__label ${serviceType === 'parameter' && 'switch__label--active'}`}
            htmlFor="service-parameter"
            onClick={() => setServiceType('parameter')}>
            Yes
          </div>
        </div>
        {/* forms */}
      </div>
      {serviceType === 'service' ? <AddServiceForm /> : <AddSubServicesForm />}
    </main>
  );
};

export default AddService;
