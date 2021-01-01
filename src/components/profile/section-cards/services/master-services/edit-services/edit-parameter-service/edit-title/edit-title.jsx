import React, { useState } from 'react';
import EditTitleForm from './edit-title-form';
import EditTitleDisplay from './edit-title-display';

const EditTitle = ({ title, shownState }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditTitleForm title={title} setIsEdit={setIsEdit} />
  ) : (
    <EditTitleDisplay title={title} shownState={shownState} setIsEdit={setIsEdit} />
  );
};

export default EditTitle;
