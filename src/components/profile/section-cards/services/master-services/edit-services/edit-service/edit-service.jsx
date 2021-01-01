import React, { useState } from 'react';
import EditServiceForm from './edit-service-form';
import EditServiceDisplay from './edit-service-display';

const EditService = ({ service }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditServiceForm service={service} setIsEdit={setIsEdit} /> // form
  ) : (
    <EditServiceDisplay service={service} setIsEdit={setIsEdit} /> // edit service display
  );
};

export default EditService;
