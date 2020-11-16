import React, { useEffect, useState } from 'react';
import { deleteAlert } from '../../redux/alert/actions';
import { useSelector, useDispatch } from 'react-redux';

const Alert = () => {
  // const { alert } = useContext(AlertContext); // redux
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const [state, setState] = useState({ isShow: false, isHidden: true });

  const alertAnimationDuration = 2000;

  useEffect(() => {
    let timeToHide, timeToNextAlert;

    if (alerts.length && state.isHidden === true) {
      setState({ isHidden: false, isShow: true });

      setTimeout(() => {
        setState({ ...state, isShow: false });
      }, alertAnimationDuration);

      setTimeout(() => {
        setState({ ...state, isHidden: true });
        dispatch(deleteAlert());
      }, alertAnimationDuration + 1000);
    }

    // return () => {
    //   if (alerts.length && state.isHidden === true) {
    //     clearTimeout(timeToHide);
    //     clearTimeout(timeToNextAlert);
    //   }
    // };
  }, [alerts.length]);

  // const isSuccess = alerts[0].type === 'success' ? 'alert--success' : 'alert--fail';
  // const isShow = ;

  return (
    <div
      className={`alert ${state.isShow ? 'alert--show' : ''} ${
        alerts[0] && alerts[0].type === 'success' ? 'alert--success' : 'alert--fail'
      }`}>
      {alerts[0] && alerts[0].message}
    </div>
  );
};

export default Alert;
