import React from 'react';
import { useSelector } from 'react-redux';

import ViewParameterService from './view-parameter-service/view-parameter-service';
import ViewService from './view-service';
import getServicesForRender from '../utils/get-services-for-render';

const ViewServicesUpdate = ({ close }) => {
  const [{ services }] = useSelector((state) => [state.services]);

  return (
    <div className="booking-services card">
      <h2 className="services__heading heading mt-8">Услуги</h2>

      <div className="services__container">
        {getServicesForRender(services).map((service, i) => {
          return service.subServices ? (
            <ViewParameterService key={i} service={service} />
          ) : (
            <ViewService key={i} service={service} />
          );
        })}
      </div>
    </div>
  );
};

export default ViewServicesUpdate;
