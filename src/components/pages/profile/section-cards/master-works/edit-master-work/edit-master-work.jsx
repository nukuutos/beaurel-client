import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import workSchema from '../utils/schema';
import ModalHeading from '../../../../../base/modal/modal-heading';
import useMediaQuery from '../../../../../../hooks/use-media-query';
import useFileUpload from '../../../../../../hooks/use-file-upload';
import useOnSubmit from './use-on-submit';
import ChangeButton from '../utils/change-button';
import MasterWorkForm from '../utils/master-work-form';

const EditMasterWork = ({ state }) => {
  const { works } = useSelector((state) => state.work);
  const isPhone = useMediaQuery(600);

  const [{ index }, setParentState] = state;

  const initialSrc = `http://localhost:5000/images/works/${works[index]._id}.png`;

  const { src, file, handleFileUpload } = useFileUpload(initialSrc);

  const [handleSubmit, isLoading] = useOnSubmit(state, file);

  const goToCarousel = () => setParentState((state) => ({ ...state, display: 'carousel' }));
  const goToWorks = () => setParentState((state) => ({ ...state, display: 'works' }));

  const handleSubmitClick = (dirty, submitForm) => (event) => {
    event.preventDefault();
    const isImageChanged = initialSrc !== src;
    if (dirty || isImageChanged) submitForm();
    else goToCarousel();
  };

  return (
    <div className={`add-master-work ${isPhone ? '' : 'card'}`}>
      <ModalHeading title="Обновить работу" onClickClose={goToCarousel} />

      {isLoading && <div className="spinner-with-background" />}

      <img src={src} alt="Uploaded work" className="add-master-work__uploaded-image" />

      <ChangeButton handleFileUpload={handleFileUpload} />

      <Formik
        initialValues={{
          title: works[index].title,
        }}
        validationSchema={workSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm, dirty }) => (
          <MasterWorkForm
            onBackButtonClick={index ? goToCarousel : goToWorks}
            onSubmit={handleSubmitClick(dirty, submitForm)}
          />
        )}
      </Formik>
    </div>
  );
};

export default EditMasterWork;
