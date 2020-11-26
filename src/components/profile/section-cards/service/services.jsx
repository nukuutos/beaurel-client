import { useState } from 'react';

import DisplayServices from './display-services';
import AddService from './add-service/add-service';

import Modal from '../../../utils/modal';

const Services = ({ onClickClose }) => {
  const [isAddService, setIsAddService] = useState(false);

  return (
    <Modal onClickClose={onClickClose}>
      {isAddService ? (
        <AddService setIsAddService={setIsAddService} />
      ) : (
        <DisplayServices setIsAddService={setIsAddService} />
      )}
    </Modal>
  );
};

export default Services;
