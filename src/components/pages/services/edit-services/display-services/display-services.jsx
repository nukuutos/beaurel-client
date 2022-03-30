import React from 'react';
import { useSelector } from 'react-redux';
import EditParameterService from './edit-parameter-service/edit-parameter-service';
import EditService from './edit-service/edit-service';

const DisplayServices = () => {
  const { services } = useSelector((state) => state.services);
  const isServices = !!services.length;

  return (
    isServices &&
    services.map((service) =>
      service.subServices ? (
        <EditParameterService key={service.title} service={service} />
      ) : (
        <EditService key={service.title} service={service} />
      )
    )
  );
};

export default DisplayServices;
