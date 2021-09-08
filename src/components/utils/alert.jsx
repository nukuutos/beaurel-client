import React, { useEffect, useRef, useState } from "react";
import { deleteAlert } from "../../redux/alert/actions";
import { useSelector, useDispatch } from "react-redux";

const Alert = () => {
  const alerts = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);

  const isShowRef = useRef();
  isShowRef.current = isShow;

  useEffect(() => {
    const popUpAnimationDuration = 640;
    const alertAnimationDuration = 3360;

    const animationDuration = alertAnimationDuration + popUpAnimationDuration;

    if (alerts.length && !isShowRef.current) {
      setIsShow(true);

      setTimeout(() => {
        setIsShow(false);
      }, alertAnimationDuration);

      setTimeout(() => {
        dispatch(deleteAlert());
      }, animationDuration);
    }
    // without cleanup function!
  }, [alerts.length]);

  // for animation not using {alerts[0] && component}
  // for correct work not using ternary operator (Success alert and when it gone it becomes red because of duration to gone)
  // className = type === 'success' ? 'alert--success' : 'alert--fail
  let message, type;
  const alert = alerts[0];
  if (alert) ({ message, type } = alert);

  return (
    <>
      <div className={`alert ${alert && type === "success" && isShow ? "alert--show" : ""} alert--success`}>
        <div className="alert__text">{alert && message}</div>
      </div>

      <div className={`alert ${alert && type === "fail" && isShow ? "alert--show" : ""} alert--fail`}>
        <div className="alert__text">{alert && message}</div>
      </div>
    </>
  );
};

export default Alert;
