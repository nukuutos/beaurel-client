import { Form } from 'formik';
import React from 'react';
import Duration from './attributes/duration';
import Price from './attributes/price';
import ButtonsForm from './buttons-form/buttons-form';
import Loading from '../loading';

const EditForm = ({ children, className, setIsEdit, ...formikProps }) => {
  const { values, isSubmitting } = formikProps;

  return (
    <Form className={className}>
      {children}

      <div className="service__side service__side--right edit-service__side">
        <Duration values={values} />
        <Price />
      </div>

      {isSubmitting ? <Loading /> : <ButtonsForm setIsEdit={setIsEdit} {...formikProps} />}
    </Form>
  );
};

export default EditForm;
