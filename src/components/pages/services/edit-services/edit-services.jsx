import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddService from './add-service/add-service';
import DisplayServices from './display-services/display-services';

const EditServices = () => {
  const [isAddService, setIsAddService] = useState(false);

  const openAddService = () => setIsAddService(true);
  const closeAddService = () => setIsAddService(false);

  return (
    <div className="services__container">
      <DisplayServices />

      <div className="service service--add service--hover card mt-6" onClick={openAddService}>
        <FontAwesomeIcon icon="plus" />
      </div>

      {isAddService && <AddService onClickClose={closeAddService} />}
    </div>
  );
};

export default EditServices;
