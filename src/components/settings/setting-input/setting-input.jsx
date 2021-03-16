import React, { useState } from 'react';
import Display from './display-input';
import Edit from './edit';

const SettingInput = ({ label, data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <Edit label={label} data={data} setIsEdit={setIsEdit} />
  ) : (
    <Display label={label} data={data} setIsEdit={setIsEdit} />
  );
};

export default SettingInput;
