import React from 'react';

const NoAvatar = ({ isLoading, onUpload }) => (
  <>
    <img src="/svg/add-avatar.svg" className="mt-2" alt="next" />
    <button type="button" className="mt-4 btn btn--primary btn--upload">
      Выбрать
      <input type="file" disabled={isLoading} onChange={onUpload} className="select__input" />
    </button>
  </>
);

export default NoAvatar;
