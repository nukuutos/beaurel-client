import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import InputCustom from '../../../form/input-custom';
import Spinner from '../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { addServiceStart, addServiceSuccess } from '../../../../redux/service/actions';
import asyncCall from '../../../../utils/async-call';
import { setAlert } from '../../../../redux/alert/actions';

const AddServiceForm = () => {
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

  const addServiceSchema = Yup.object().shape({
    // service: Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(3, 'Minimum length is 3 characters')
      .max(30, 'Maximum length is 30 characters')
      .required('Field is required'),
    duration: Yup.number()
      .positive('Duration can not be negative')
      .integer('Duration must be an integer')
      .max(700, 'Duration can not be more than 8 hours') // change it next time
      .test('duration', 'This duration is not suitable for session time', (duration) => duration % sessionTime === 0)
      .required('Duration is required'),
    price: Yup.number()
      .positive('Price can not be negative')
      .integer('Price must be an integer')
      .max(30000, 'Price is too big'),
    // }),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        duration: '',
        price: '',
        date: null,
      }}
      validationSchema={addServiceSchema}
      onSubmit={async (values, { resetForm }) => {
        const { date, ...service } = values;

        const config = {
          method: 'post',
          url: '/profile/5eb849b81c2ccc21306ced34/service',
          data: { date, service },
          accessToken,
        };

        const data = await asyncCall(dispatch, config);

        if (data) {
          const { ids, ...alert } = data;
          dispatch(addServiceSuccess({ service: { ids, ...service } }));
          dispatch(setAlert(alert));
          resetForm();
        }
      }}>
      {({ dirty, isSubmitting }) => (
        <Form className="services--add-service">
          <label className="service__label" htmlFor="title">
            Title
          </label>
          <InputCustom className="service__input" type="text" name="title" id="title" />
          <ErrorMessage name="title">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage>

          <label className="service__label" htmlFor="duration">
            Duration
          </label>
          <InputCustom className="service__input" type="number" name="duration" id="duration" />
          <ErrorMessage name="duration">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage>

          <label className="service__label" htmlFor="price">
            Price
          </label>
          <InputCustom className="service__input" type="number" name="price" id="price" />
          <ErrorMessage name="price">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage>

          <div className="mt-m display-flex g-cf p-r">
            {isSubmitting && <Spinner className="spinner--edge spinner--tiny mr-s" />}
            <button
              disabled={isSubmitting}
              className={`w-f btn btn--secondary mt-m mb-h ${isSubmitting ? 'btn--submited' : ''}`}
              type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddServiceForm;
