import { useState } from 'react';
import AddServiceForm from './add-service-form/add-service-form';
import AddSubServicesForm from './add-service-parameter-form/add-service-parameter-form';
import Modal from '../../../../base/modal/modal';
import ModalHeading from '../../../../base/modal/modal-heading';
import Switch from './switch';

const AddService = ({ onClickClose }) => {
  const [serviceType, setServiceType] = useState('service');

  return (
    <Modal onClickClose={onClickClose}>
      <div className="add-service">
        <ModalHeading
          titleDesktopClassName="add-service__heading"
          title="Добавить услугу"
          onClickClose={onClickClose}
        />

        <div className="add-service__switch">
          <div className="add-service__switch-label">С параметрами</div>
          <Switch state={[serviceType, setServiceType]} />
        </div>

        {serviceType === 'service' ? (
          <AddServiceForm onClickClose={onClickClose} />
        ) : (
          <AddSubServicesForm onClickClose={onClickClose} />
        )}
      </div>
    </Modal>
  );
};

export default AddService;
