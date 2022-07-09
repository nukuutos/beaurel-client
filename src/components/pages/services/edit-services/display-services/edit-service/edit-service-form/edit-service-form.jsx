import React from 'react';
import { Formik } from 'formik';
import { serviceSchema } from '../../../../utils/schemas';
import useOnSubmit from './use-on-submit';
import Title from './title';
import EditForm from '../../shared/edit-form/edit-form';

const EditServiceForm = ({ service, setIsEdit }) => {
  const { title, duration, price } = service;

  const [handleSubmit] = useOnSubmit(service, setIsEdit);

  return (
    <Formik
      initialValues={{ title, duration, price }}
      validationSchema={serviceSchema}
      onSubmit={handleSubmit}
    >
      {({ ...props }) => (
        <EditForm
          className="service service--edit-mobile card mt-6"
          setIsEdit={setIsEdit}
          {...props}
        >
          <Title />
        </EditForm>
      )}
    </Formik>
  );
};

export default EditServiceForm;
