import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DisplayInput from '../utils/display-input';
import UsernameEdit from './username-edit';

const Username = () => {
  const { id, username } = useSelector((state) => state.auth);
  const [isEdit, setIsEdit] = useState(false);

  const usernameToDisplay = username || id;

  return isEdit ? (
    <UsernameEdit data={usernameToDisplay} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Username" data={usernameToDisplay} setIsEdit={setIsEdit} />
  );
};

export default Username;
