import React from 'react';

const Pen = ({ className, onClick }) => (
  <svg
    onClick={onClick}
    className={className}
    width="33"
    height="32"
    viewBox="0 0 33 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.1722 5.82713L26.1736 13.8285L8.79895 31.2032L1.66508 31.9907C0.710066 32.0963 -0.0968229 31.2888 0.00942893 30.3338L0.803192 23.1949L18.1722 5.82713V5.82713ZM31.1225 4.63586L27.3655 0.878921C26.1936 -0.292974 24.293 -0.292974 23.1211 0.878921L19.5866 4.41335L27.588 12.4147L31.1225 8.8803C32.2943 7.70778 32.2943 5.80775 31.1225 4.63586V4.63586Z" />
  </svg>
);

export default Pen;
