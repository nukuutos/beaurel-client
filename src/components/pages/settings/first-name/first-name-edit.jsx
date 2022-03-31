import React, { useRef } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import Input from '../../../base/form/input';
import useOnSubmit from '../utils/use-on-submit';
import EditButtons from '../utils/edit-buttons';
import { firstNameSchema } from '../schemas/name';

const FirstNameEdit = ({ data, setIsEdit }) => {
  const formikRef = useRef(null);

  const [handleSubmit, isLoading] = useOnSubmit(setIsEdit);

  const closeEdit = () => setIsEdit(false);

  const handleEdit = (event) => {
    const { dirty, submitForm } = formikRef.current;

    event.preventDefault();
    if (dirty) submitForm();
    else closeEdit();
  };

  return (
    <Formik
      innerRef={formikRef}
      validationSchema={firstNameSchema}
      initialValues={{
        firstName: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <div className="setting-card__input">
            <label htmlFor="firstName" className="label">
              Имя
            </label>
            <Input name="firstName" className="input" type="text" />
            <ErrorMessage name="firstName">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default FirstNameEdit;
