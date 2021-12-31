import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayInput from '../utils/display-input';
import LastNameEdit from './last-name-edit';

const LastName = () => {
  const { lastName } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <LastNameEdit data={lastName} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Фамилия" data={lastName} setIsEdit={setIsEdit} />
  );
};

export default LastName;
