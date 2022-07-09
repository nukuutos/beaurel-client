import React from 'react';
import displayDuration from '../utils/display-duration';

const ResendCode = ({ timer, resendCode }) =>
  timer ? (
    <span className="sign-up__repeat mt-3">
      Повторно получить код можно через
      <span className="sign-up__time"> {displayDuration(timer)}</span>
    </span>
  ) : (
    <span className="sign-up__repeat mt-3">
      Не получили код?{' '}
      <span onClick={resendCode} className="btn-text">
        отправить повторно
      </span>
    </span>
  );

export default ResendCode;
