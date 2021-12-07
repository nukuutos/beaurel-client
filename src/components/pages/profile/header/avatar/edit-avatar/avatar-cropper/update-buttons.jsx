import React from 'react';

const UpdateButtons = ({ isLoading, onUpload, onSubmit }) => (
  <div className="upload-avatar__buttons">
    <button type="button" className={`btn btn--secondary btn--upload `}>
      Выбрать
      <input
        type="file"
        disabled={isLoading}
        onChange={onUpload}
        title="file-input"
        className="select__input"
      />
    </button>
    <button onClick={onSubmit} type="submit" disabled={isLoading} className="btn btn--primary">
      Сохранить
    </button>
  </div>
);

export default UpdateButtons;
