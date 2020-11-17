import React, { useEffect } from 'react';
import Service from './service/service';
import ParameterService from './parameter-service/parameter-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { getServicesStart } from '../../../../redux/service/actions';

const DisplayServices = ({ setIsAddService }) => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    if (!services.length) dispatch(getServicesStart());
  }, []);

  return (
    <div className="services services--display">
      <h2 className="services__heading header-secondary mb-s">Services</h2>

      {services.length ? (
        services.map((service, i) => {
          return service.subServices ? (
            <ParameterService service={service} key={i} />
          ) : (
            <Service service={service} key={i} />
          );
        })
      ) : (
        <p className="services__first-service mb-s">Add your first service!</p>
      )}

      <div className="service--add mb-m mt-m" onClick={() => setIsAddService(true)}>
        <FontAwesomeIcon icon="plus" />
      </div>
    </div>
  );
};

export default DisplayServices;
