import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Edit = ({ label, data, setIsEdit }) => {
  return (
    <>
      <div className="setting-card__input">
        <label className="label">{label}</label>
        <input className="input" value={data} type="text" />
      </div>
      <div onClick={() => null} className="setting-card__success-button btn--edit mt-3">
        <FontAwesomeIcon icon="check" />
      </div>
      <div onClick={() => setIsEdit(false)} className="setting-card__fail-button btn--edit mt-3">
        <FontAwesomeIcon icon="times" />
      </div>
    </>
  );
};

export default Edit;
