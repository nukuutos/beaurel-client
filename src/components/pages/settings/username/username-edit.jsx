import React, { useRef } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import Input from '../../../base/form/input';
import useOnSubmit from './use-on-submit';
import EditButtons from '../utils/edit-buttons';
import usernameSchema from '../schemas/username';

const UsernameEdit = ({ data, setIsEdit }) => {
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
      validationSchema={usernameSchema}
      initialValues={{
        username: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <div className="setting-card__input">
            <label htmlFor="username" className="label">
              Username
            </label>
            <Input name="username" className="input" type="text" />
            <ErrorMessage name="username">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default UsernameEdit;
