import React from 'react';

const Star = ({ className, onClick }) => (
  <svg
    width="126"
    height="120"
    viewBox="0 0 126 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    onClick={onClick}
    className={className}
  >
    <path d="M55.9619 4.17433L40.6591 35.2017L6.42119 40.1933C0.281326 41.0838 -2.17931 48.6532 2.27327 52.9886L27.0436 77.1263L21.185 111.224C20.1304 117.387 26.6218 122.004 32.0587 119.121L62.6877 103.021L93.3167 119.121C98.7535 121.98 105.245 117.387 104.19 111.224L98.3317 77.1263L123.102 52.9886C127.555 48.6532 125.094 41.0838 118.954 40.1933L84.7162 35.2017L69.4134 4.17433C66.6716 -1.35624 58.7272 -1.42654 55.9619 4.17433Z" />
  </svg>
);

export default Star;
