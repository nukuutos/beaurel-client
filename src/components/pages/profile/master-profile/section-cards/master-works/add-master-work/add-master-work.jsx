import { useSelector } from 'react-redux';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import useFileUpload from '../../../../../../../hooks/use-file-upload';
import useOnSubmit from './use-on-submit';
import NoWork from './no-work';
import UploadedWork from './uploaded-work';

const AddMasterWork = ({ setParentState }) => {
  const { isPhone } = useSelector((state) => state.screenSize);

  const goToWorks = () => setParentState((state) => ({ ...state, display: 'works' }));

  const { src, isUploaded, handleFileUpload, file } = useFileUpload(null);

  const [handleSubmit, isLoading] = useOnSubmit(file, goToWorks);

  return (
    <div className={`add-master-work ${isPhone ? '' : 'card'}`}>
      {isLoading && <div className="spinner-with-background" />}

      <ModalHeading title="Добавить работу" onClickClose={goToWorks} />

      {isUploaded ? (
        <UploadedWork
          src={src}
          handleFileUpload={handleFileUpload}
          handleSubmit={handleSubmit}
          goToWorks={goToWorks}
        />
      ) : (
        <NoWork handleFileUpload={handleFileUpload} />
      )}
    </div>
  );
};

export default AddMasterWork;
