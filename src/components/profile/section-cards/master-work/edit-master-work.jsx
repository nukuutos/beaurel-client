import React, { useState } from 'react';
import EditMasterWorkDisplay from './edit-master-work-display';
import EditMasterWorkForm from './edit-master-work-form';

const EditMasterWork = ({ work, ...props }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditMasterWorkForm work={work} setIsEdit={setIsEdit} />
  ) : (
    <EditMasterWorkDisplay work={work} setIsEdit={setIsEdit} {...props} />
  );
};

export default EditMasterWork;
