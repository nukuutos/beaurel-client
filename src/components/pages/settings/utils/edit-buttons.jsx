import React from 'react';
import Check from '../../../base/icons/check';
import Cross from '../../../base/icons/cross';
import Spinner from '../../../base/spinner';

const EditButtons = ({ isLoading, handleEdit, close }) =>
  isLoading ? (
    <Spinner className="setting-card__edit-button spinner--absolute spinner--tiny mt-6" />
  ) : (
    <>
      <div onClick={handleEdit} className="setting-card__success-button btn-icon mt-3">
        <Check />
      </div>
      <div onClick={close} className="setting-card__fail-button btn-icon btn-icon--fail mt-3">
        <Cross />
      </div>
    </>
  );

export default EditButtons;
