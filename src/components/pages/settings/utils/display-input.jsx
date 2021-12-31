import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DisplayInput = ({ label, data, setIsEdit }) => (
  <>
    <div className="setting-card__display input--display">
      <label className="label">{label}</label>
      {data}
    </div>

    <div onClick={() => setIsEdit(true)} className="setting-card__edit-button btn-icon">
      <FontAwesomeIcon icon="pen" />
    </div>
  </>
);

export default DisplayInput;
