import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ButtonMarker = ({ onClick = null }) => {
  return (
    <span className="button-marker" onClick={onClick}>
      <FontAwesomeIcon className="button-marker__marker" icon="pen" />
    </span>
  );
};

export default ButtonMarker;
