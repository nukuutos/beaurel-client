import React, { useState } from 'react';
import EditSubServiceForm from './edit-sub-service-form/edit-sub-service-form';
import EditSubServiceDisplay from './edit-sub-service-display/edit-sub-service-display';

const EditSubService = ({ events, subService, serviceProps }) => {
  const [isEdit, setIsEdit] = useState(false);

  const { title } = serviceProps;

  return isEdit ? (
    <EditSubServiceForm subService={subService} title={title} setIsEdit={setIsEdit} />
  ) : (
    <EditSubServiceDisplay
      events={events}
      serviceProps={serviceProps}
      subService={subService}
      setIsEdit={setIsEdit}
    />
  );
};

export default EditSubService;
