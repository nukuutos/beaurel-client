import Modal from '../../../utils/modal';
import ParameterService from './parameter-service';
import Service from './service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, Fragment, useEffect } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import InputCustom from '../../../form/input-custom';
import AddingSubServicesFields from './add-sub-services-form';
import AddingServiceFields from './adding-service-fields';
import DisplayServices from './display-services';
import AddServiceForm from './add-service-form';
import AddService from './add-service';

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
