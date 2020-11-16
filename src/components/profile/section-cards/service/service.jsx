import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteServiceStart, updateServiceStart } from '../../../../redux/service/actions';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputCustom from '../../../form/input-custom';

const editServiceSchema = Yup.object().shape({
  title: Yup.string()
    .trim()
    .min(3, 'Minimum length is 3 characters')
    .max(30, 'Maximum length is 30 characters')
    .required('Field is required'),
  duration: Yup.number()
    .positive('Duration can not be negative')
    .integer('Duration must be an integer')
    .max(700, 'Duration can not be more than 8 hours') // change it next time
    .test('duration', 'This duration is not suitable for session time', (duration) => duration % 312 === 0) // redux
    .required('Duration is required'),
  price: Yup.number()
    .positive('Price can not be negative')
    .integer('Price must be an integer')
    .max(30000, 'Price is too big'),
  // }),
});

const Service = ({ service }) => {
  const { title, duration, price, id } = service;
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  return (
    <>
      {isEdit ? (
        <Formik
          initialValues={{
            title,
            duration,
            price,
            id,
          }}
          validationSchema={editServiceSchema}
          onSubmit={(values) => console.log('sent')}>
          {({ values }) => (
            <>
              <Form className="service service--edit">
                <span className="service__cell service__title ">
                  <InputCustom className="service--edit-title" type="text" name="title" id="title" />
                </span>
                <span className="service__cell service__duration">
                  <InputCustom type="number" name="duration" id="duration" />
                </span>
                <span className="service__cell service__price">
                  <InputCustom className="service__cell service__price" type="text" name="price" id="price" />
                </span>
              </Form>
              <div
                onClick={() => dispatch(updateServiceStart({ service: values, date: null, type: 'service' }))}
                className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsEdit(false)} className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </Formik>
      ) : (
        <>
          <div className="service" onClick={() => console.log(1)}>
            <span className="service__cell service__title">{title}</span>
            <span className="service__cell service__duration">{duration}</span>
            <span className="service__cell service__price">{price}</span>
          </div>
          <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage">
            <FontAwesomeIcon icon="pen" />
          </div>
          <div
            onClick={() => dispatch(deleteServiceStart({ service: { id }, type: 'service' }))}
            className="service__icon service__icon--manage">
            <FontAwesomeIcon icon="trash" /> {/* times */}
          </div>
        </>
      )}
    </>
  );
};

export default Service;
