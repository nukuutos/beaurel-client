import React from 'react';

const DraggableHorizontalLines = ({ className }) => (
  <svg
    width="240"
    height="12"
    viewBox="0 0 240 12"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="240" width="4" height="240" rx="1" transform="rotate(90 240 0)" fill="none" />
    <rect x="207" y="8" width="4" height="160" rx="1" transform="rotate(90 207 8)" fill="none" />
  </svg>
);

export default DraggableHorizontalLines;
