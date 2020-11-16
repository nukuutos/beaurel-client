import React from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { updateServiceStart } from '../../../../redux/service/actions';
import * as Yup from 'yup';

const EditSubService = ({ subService, title, isLastService, setIsSubServiceEdit }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;

  const editSubServiceSchema = Yup.object().shape({
    parameter: Yup.string()
      .trim()
      .min(2, 'Minimum length is 2 characters')
      .max(20, 'Maximum length is 20 characters')
      .required('Field is required'),
    duration: Yup.number()
      .positive('Duration can not be negative')
      .integer('Duration must be an integer')
      .max(480, 'Duration can not be more than 8 hours')
      .test('duration', 'This duration is not suitable for session time', (duration) => duration % 312 === 0)
      .required('Duration is required'),
    price: Yup.number()
      .positive('Price can not be negative')
      .integer('Price must be an integer')
      .max(30000, 'Price is too big'),
  });

  return (
    <Formik
      initialValues={{
        parameter,
        duration,
        price,
        id,
      }}
      validationSchema={editSubServiceSchema}
      onSubmit={(values) => console.log('sent')}>
      {({ values }) => (
        <>
          <Form className="service service--edit">
            <span
              className={`service__cell service__parameter ${
                isLastService ? 'service__parameter--last-parameter' : ''
              }`}>
              <InputCustom className="service--edit-title" type="text" name="parameter" id="parameter" />
            </span>
            <span className="service__cell service__duration">
              <InputCustom type="number" name="duration" id="duration" />
            </span>
            <span
              className={`service__cell service__price service__price--parameter ${
                isLastService ? 'service__price--last-parameter' : ''
              }`}>
              <InputCustom className="service__cell service__price" type="text" name="price" id="price" />
            </span>
          </Form>
          <div
            onClick={() =>
              dispatch(updateServiceStart({ service: { title, ...values }, date: null, type: 'sub-service' }))
            }
            className="service__icon service__icon--manage">
            <FontAwesomeIcon icon="check" />
          </div>
          <div onClick={() => setIsSubServiceEdit(false)} className="service__icon service__icon--manage">
            <FontAwesomeIcon icon="times" />
          </div>
        </>
      )}
    </Formik>
  );
};

export default EditSubService;
