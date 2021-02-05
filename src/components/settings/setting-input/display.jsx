import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Display = ({ label, data, setIsEdit }) => {
  return (
    <>
      <div className="setting-card__display input--display">
        <label className="label">{label}</label>
        {data}
      </div>
      <div onClick={() => setIsEdit(true)} className="setting-card__edit-button btn--edit">
        <FontAwesomeIcon icon="pen" />
      </div>
    </>
  );
};

export default Display;
