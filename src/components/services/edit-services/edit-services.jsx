import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditParameterService from './edit-parameter-service/edit-parameter-service';
import EditService from './edit-service/edit-service';
import AddService from '../add-service/add-service';
import Modal from '../../utils/modal';

const EditServices = ({ services }) => {
  const { isPublicView } = useSelector((state) => state.profile); // add public view
  const [isAddService, setIsAddService] = useState(false);

  return (
    <div className="services__container">
      {services.length ? (
        services.map((service, i) => {
          return (
            <div key={i} className="service__wrapper card mt-6">
              {service.subServices ? <EditParameterService service={service} /> : <EditService service={service} />}
            </div>
          );
        })
      ) : (
        // change it
        <p className="services__first-service gc-f mb-m mt-s-4">
          {isPublicView ? 'Sorry, no services yet!' : 'Add your first service!'}
        </p>
      )}

      <div className="service__wrapper">
        <div className="service service--add card mt-6" onClick={() => setIsAddService(true)}>
          <FontAwesomeIcon icon="plus" />
        </div>
      </div>

      {isAddService && (
        <Modal onClickClose={() => setIsAddService(false)}>
          <AddService setIsAddService={setIsAddService} />
        </Modal>
      )}
    </div>
  );
};

export default EditServices;
