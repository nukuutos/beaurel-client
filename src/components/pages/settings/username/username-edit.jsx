import React, { useRef } from 'react';
import { Form, Formik } from 'formik';
import Input from '../../../base/form/input';
import useOnSubmit from './use-on-submit';
import EditButtons from '../utils/edit-buttons';

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
          </div>
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default UsernameEdit;
