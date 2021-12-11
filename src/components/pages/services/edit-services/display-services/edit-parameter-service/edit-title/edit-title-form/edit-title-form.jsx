import React from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parameterServiceTitleSchema } from '../../../../../utils/schemas';
import Textarea from '../../../../../../../base/form/textarea';
import useOnSubmit from './use-on-submit';
import Loading from '../../../utils/loading';
import ButtonsForm from '../../../utils/buttons-form/buttons-form';

const EditTitleForm = ({ title, setIsEdit }) => {
  const [handleSubmit, isLoading] = useOnSubmit(setIsEdit);

  return (
    <Formik
      initialValues={{
        title,
        oldTitle: title,
      }}
      validationSchema={parameterServiceTitleSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <Form className="service service--edit-mobile service--edit">
          <div className="service__side service__side--left">
            <Textarea className="edit-service__textarea textarea input" type="text" name="title" />
          </div>

          <div className="service__side service__side--right">
            <div className={`service-parameter__icon `}>
              <FontAwesomeIcon icon="caret-left" />
            </div>
          </div>

          {isLoading ? <Loading /> : <ButtonsForm setIsEdit={setIsEdit} {...formikProps} />}
        </Form>
      )}
    </Formik>
  );
};

export default EditTitleForm;
