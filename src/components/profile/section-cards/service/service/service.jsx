import React, { useState } from 'react';
import EditService from './edit-service';
import DisplayService from './display-service';

const Service = ({ service }) => {
  const [isEdit, setIsEdit] = useState(false);

  return isEdit ? (
    <EditService service={service} setIsEdit={setIsEdit} />
  ) : (
    <DisplayService service={service} setIsEdit={setIsEdit} />
  );
};

export default Service;
