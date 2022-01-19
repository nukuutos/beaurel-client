const ChangeButton = ({ handleFileUpload }) => (
  <div className="add-master-work__change-btn mt-4">
    <button type="button" className="btn-text">
      изменить
    </button>
    <input type="file" onChange={handleFileUpload} className="add-master-work__upload-input" />
  </div>
);

export default ChangeButton;
