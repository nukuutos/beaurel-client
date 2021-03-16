import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddServiceForm from './add-service-form';
import AddSubServicesForm from './add-service-parameter-form';
import { getTimetableSuccess } from '../../../redux/timetable/actions';
import useAsyncAction from '../../../hooks/useAsyncAction';
import Spinner from '../../utils/spinner';

const AddService = () => {
  const [serviceType, setServiceType] = useState('service'); // service or subservice
  const [{ sessionTime }, { id }] = useSelector((state) => [state.timetable, state.auth]);
  const dispatch = useDispatch();
  const [asyncAction, isLoading] = useAsyncAction();

  const getTimetable = async () => {
    const config = {
      method: 'get',
      url: `/profile/${id}/timetable`,
    };

    const data = await asyncAction(config);

    if (data) {
      dispatch(getTimetableSuccess(data));
    }
  };

  useEffect(() => {
    if (!sessionTime) getTimetable();
  }, []);

  // important: sessionTime instead of isLoading
  // descrition: forms contain select element that must have value that is not null.
  // descrition: firstly isloading = false and only then we are dispatching sessionTime to store
  return !sessionTime ? (
    <div className="wrapper">
      <Spinner className="spinner--gc gc-f" />
    </div>
  ) : (
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
