import { Formik } from 'formik';
import React from 'react';
import MasterWorkForm from '../utils/master-work-form';
import ChangeButton from '../utils/change-button';
import workSchema from '../utils/schema';

const UploadedWork = ({ src, handleFileUpload, handleSubmit, goToWorks }) => (
  <>
    <img src={src} alt="Uploaded work" className="add-master-work__uploaded-image" />

    <ChangeButton handleFileUpload={handleFileUpload} />

    <Formik
      initialValues={{
        title: '',
      }}
      validationSchema={workSchema}
      onSubmit={handleSubmit}
    >
      <MasterWorkForm onBackButtonClick={goToWorks} />
    </Formik>
  </>
);

export default UploadedWork;
