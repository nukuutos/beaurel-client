import React from 'react';

const DraggableVerticalLines = ({ className }) => {
  return (
    <svg className={className} width="16" height="35" viewBox="0 0 16 35" fill="none">
      <path
        id="draggable-vertical-lines"
        d="M5.33333 33.9062V1.09375C5.33333 0.492187 4.73333 0 4 0H1.33333C0.6 0 0 0.492187 0 1.09375V33.9062C0 34.5078 0.6 35 1.33333 35H4C4.73333 35 5.33333 34.5078 5.33333 33.9062ZM16 33.9062V1.09375C16 0.492187 15.4 0 14.6667 0H12C11.2667 0 10.6667 0.492187 10.6667 1.09375V33.9062C10.6667 34.5078 11.2667 35 12 35H14.6667C15.4 35 16 34.5078 16 33.9062Z"
      />
    </svg>
  );
};

export default DraggableVerticalLines;
