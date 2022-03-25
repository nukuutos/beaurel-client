import React from 'react';
import { useSelector } from 'react-redux';
import UpdateDateDesktop from './update-date-desktop';
import UpdateDatePhone from './update-date-phone';

const UpdateDate = ({ ...props }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? <UpdateDatePhone {...props} /> : <UpdateDateDesktop {...props} />;
};

export default UpdateDate;
