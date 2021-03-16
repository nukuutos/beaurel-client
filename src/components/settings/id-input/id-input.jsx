import React, { useState } from 'react';
import DisplayInput from '../setting-input/display-input';
import IdInputEdit from './id-input-edit';

const IdInput = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <IdInputEdit data={data} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Ваш Id" data={data} setIsEdit={setIsEdit} />
  );
};

export default IdInput;
