import { useState } from 'react';

import DisplayServices from './display-services';
import AddService from './add-service';

import Modal from '../../../utils/modal';

const Services = ({ onClickClose }) => {
  const [isAddService, setIsAddService] = useState(false);

  return (
    <Modal onClickClose={onClickClose}>
      <main>
        {isAddService ? (
          <AddService setIsAddService={setIsAddService} />
        ) : (
          <DisplayServices setIsAddService={setIsAddService} />
        )}
      </main>
    </Modal>
  );
};

export default Services;
