import React from 'react';
import { useSelector } from 'react-redux';
import EditSessionTimeDesktop from './edit-session-time-desktop';
import EditSessionTimePhone from './edit-session-time-phone';

const EditSessionTime = ({ handleClicks, values }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  return isPhone ? (
    <EditSessionTimePhone handleClicks={handleClicks} values={values} />
  ) : (
    <EditSessionTimeDesktop handleClicks={handleClicks} values={values} />
  );
};
export default EditSessionTime;
