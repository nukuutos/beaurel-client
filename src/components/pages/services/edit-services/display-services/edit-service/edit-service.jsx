import React, { useState } from 'react';
import EditServiceForm from './edit-service-form/edit-service-form';
import EditServiceDisplay from './edit-service-display/edit-service-display';

const EditService = ({ service }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditServiceForm service={service} setIsEdit={setIsEdit} />
  ) : (
    <EditServiceDisplay service={service} setIsEdit={setIsEdit} />
  );
};

export default EditService;
