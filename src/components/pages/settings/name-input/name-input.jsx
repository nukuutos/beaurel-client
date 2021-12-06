import React, { useState } from 'react';
import DisplayInput from '../setting-input/display-input';
import NameInputEdit from './name-input-edit';

const NameInput = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <NameInputEdit data={data} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Имя" data={data} setIsEdit={setIsEdit} />
  );
};

export default NameInput;
