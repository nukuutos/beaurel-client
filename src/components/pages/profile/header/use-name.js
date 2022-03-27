import React from 'react';
import { useSelector } from 'react-redux';

const useName = () => {
  const { firstName, lastName } = useSelector((state) => state.profile);

  return `${firstName} ${lastName[0]}.`; // to hook
};

export default useName;
