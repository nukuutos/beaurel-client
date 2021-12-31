import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayInput from '../utils/display-input';
import FirstNameEdit from './first-name-edit';

const FirstName = () => {
  const { firstName } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <FirstNameEdit data={firstName} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Имя" data={firstName} setIsEdit={setIsEdit} />
  );
};

export default FirstName;
