import React from 'react';

const NoWork = ({ handleFileUpload }) => (
  <>
    <img src="/svg/picture.svg" className="add-master-work__svg" alt="Add work" />

    <div className="add-master-work__choose-image">
      <button type="button" className="btn btn--primary">
        Выбрать изображение
      </button>
      <input type="file" onChange={handleFileUpload} className="add-master-work__upload-input" />
    </div>
  </>
);

export default NoWork;
