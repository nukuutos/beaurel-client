import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditParameterService from './parameter-service/edit-parameter-service';
import EditService from './service/edit-service/edit-service';

const EditServices = ({ services, setIsAddService }) => {
  const { isPublicView } = useSelector((state) => state.profile); // add public view

  return (
    <>
      {services.length ? (
        services.map((service, i) => {
          return service.subServices ? (
            <EditParameterService service={service} key={i} />
          ) : (
            <EditService service={service} key={i} />
          );
        })
      ) : (
        <p className="services__first-service gc-f mb-m mt-s-4">
          {isPublicView ? 'Sorry, no services yet!' : 'Add your first service!'}
        </p>
      )}

      <div
        // className={`service--add gc-f ${services.length !== 0 ? 'mt-s-6' : ''}`}
        className="service--add gc-f"
        onClick={() => setIsAddService(true)}>
        <FontAwesomeIcon icon="plus" />
      </div>
    </>
  );
};

export default EditServices;
