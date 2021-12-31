import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Formik } from 'formik';
import Input from '../../../base/form/input';
import useOnSubmit from '../utils/use-on-submit';
import EditButtons from '../utils/edit-buttons';

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
          </div>
          <EditButtons isLoading={isLoading} handleEdit={handleEdit} close={closeEdit} />
        </Form>
      )}
    </Formik>
  );
};

export default LastNameEdit;
