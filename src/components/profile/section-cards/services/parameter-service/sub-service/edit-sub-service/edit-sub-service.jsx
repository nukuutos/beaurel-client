import React, { useState } from 'react';
import EditSubServiceForm from './edit-sub-service-form';
import EditSubServiceDisplay from './edit-sub-service-display';

const EditSubService = ({ subService, title, isLastService }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditSubServiceForm subService={subService} title={title} isLastService={isLastService} setIsEdit={setIsEdit} />
  ) : (
    <EditSubServiceDisplay subService={subService} title={title} isLastService={isLastService} setIsEdit={setIsEdit} />
  );
};

export default EditSubService;
