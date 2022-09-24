import { Formik } from 'formik';
import { useSelector } from 'react-redux';

import workSchema from '../utils/schema';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import useFileUpload from '../../../../../../../hooks/use-file-upload';
import useOnSubmit from './use-on-submit';
import ChangeButton from '../utils/change-button';
import MasterWorkForm from '../utils/master-work-form';

const EditMasterWork = ({ state, goToCarousel, goToGallery }) => {
  const [{ id: masterId }, { works }] = useSelector((state) => [state.auth, state.work]);

  const { index } = state;

  const initialSrc = `https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_S3_BUCKET}/${masterId}/${works[index]._id}.webp`;

  const { src, file, handleFileUpload } = useFileUpload(initialSrc);

  const [handleSubmit, isLoading] = useOnSubmit({ state, goToCarousel, file });

  const handleSubmitClick = (dirty, submitForm) => (event) => {
    event.preventDefault();
    const isImageChanged = initialSrc !== src;
    if (dirty || isImageChanged) submitForm();
    else goToCarousel();
  };

  return (
    <div className="add-master-work">
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
            onBackButtonClick={index ? goToCarousel : goToGallery}
            onSubmit={handleSubmitClick(dirty, submitForm)}
          />
        )}
      </Formik>
    </div>
  );
};

export default EditMasterWork;
