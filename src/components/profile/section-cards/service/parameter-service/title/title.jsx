import React, { useState } from 'react';
import DisplayTitle from './display-title';
import EditTitle from './edit-title';

const Title = ({ title, shownState }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditTitle title={title} setIsEdit={setIsEdit} />
  ) : (
    <DisplayTitle title={title} shownState={shownState} setIsEdit={setIsEdit} />
  );
};

export default Title;
