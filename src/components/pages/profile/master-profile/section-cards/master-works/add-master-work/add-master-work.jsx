import ModalHeading from '../../../../../../base/modal/modal-heading';
import useFileUpload from '../../../../../../../hooks/use-file-upload';
import useOnSubmit from './use-on-submit';
import NoWork from './no-work';
import UploadedWork from './uploaded-work';

const AddMasterWork = ({ goToGallery }) => {
  const { src, isUploaded, handleFileUpload, file } = useFileUpload(null);

  const [handleSubmit, isLoading] = useOnSubmit(file, goToGallery);

  return (
    <div className="add-master-work">
      {isLoading && <div className="spinner-with-background" />}

      <ModalHeading title="Добавить работу" onClickClose={goToGallery} />

      {isUploaded ? (
        <UploadedWork
          src={src}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
          goToWorks={goToGallery}
        />
      ) : (
        <NoWork handleFileUpload={handleFileUpload} />
      )}
    </div>
  );
};

export default AddMasterWork;
