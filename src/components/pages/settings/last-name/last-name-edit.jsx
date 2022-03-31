import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ErrorMessage, Form, Formik } from 'formik';
import Input from '../../../base/form/input';
import useOnSubmit from '../utils/use-on-submit';
import EditButtons from '../utils/edit-buttons';
import { lastNameSchema } from '../schemas/name';

const LastNameEdit = ({ data, setIsEdit }) => {
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
      validationSchema={lastNameSchema}
      initialValues={{
        lastName: data,
      }}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form className="setting-card__form">
          <div className="setting-card__input">
            <span className="label">Фамилия</span>
            <Input name="lastName" className="input" type="text" />
            <ErrorMessage name="lastName">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default LastNameEdit;
