import React from 'react';

import Pen from '../../../base/icons/pen';

const DisplayInput = ({ label, data, setIsEdit = null }) => (
  <>
    <div className="setting-card__display input--display">
      <label className="label">{label}</label>
      {data}
    </div>
    {setIsEdit && (
      <div onClick={() => setIsEdit(true)} className="setting-card__edit-button btn-icon">
        <Pen />
      </div>
    )}
  </>
);

export default DisplayInput;
