import React, { useState } from 'react';
import DisplayInput from '../setting-input/display-input';
import TelephoneInputEdit from './telephone-input-edit';

const TelephoneInput = ({ data }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <TelephoneInputEdit data={data} setIsEdit={setIsEdit} />
  ) : (
    <DisplayInput label="Телефон" data={data} setIsEdit={setIsEdit} />
  );
};

export default TelephoneInput;
