import React, { useState } from 'react';
import EditTitleForm from './edit-title-form/edit-title-form';
import EditTitleDisplay from './edit-title-display/edit-title-display';

const EditTitle = ({ service, shownState }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditTitleForm title={service.title} setIsEdit={setIsEdit} />
  ) : (
    <EditTitleDisplay service={service} shownState={shownState} setIsEdit={setIsEdit} />
  );
};

export default EditTitle;
