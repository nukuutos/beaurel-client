import React from 'react';

const MapMarker = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="32"
    viewBox="0 0 24 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M10.7667 31.3544C1.68562 18.1894 0 16.8383 0 12C0 5.37256 5.37256 0 12 0C18.6274 0 24 5.37256 24 12C24 16.8383 22.3144 18.1894 13.2332 31.3544C12.6373 32.2152 11.3626 32.2152 10.7667 31.3544ZM12 17C14.7614 17 17 14.7614 17 12C17 9.23856 14.7614 7 12 7C9.23856 7 7 9.23856 7 12C7 14.7614 9.23856 17 12 17Z" />
  </svg>
);

export default MapMarker;
