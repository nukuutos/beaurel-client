import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import InputCustom from '../../../../form/input-custom';
import Spinner from '../../../../utils/spinner';
import { useSelector, useDispatch } from 'react-redux';
import asyncCall from '../../../../../utils/async-call';
import { addServiceSuccess } from '../../../../../redux/service/actions';
import { setAlert } from '../../../../../redux/alert/actions';
// import { titleField, durationField, priceField } from './parameter-service/utils';
import serviceSchema from './../utils';

const AddServiceForm = () => {
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: '',
        duration: '',
        price: '',
        date: null,
      }}
      validationSchema={serviceSchema(sessionTime)}
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
      {({ isSubmitting, dirty, isValidating }) => (
        <Form className="services__form">
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

          <div className="mt-s-5 mb-s-2 display-flex gc-f p-r ">
            {isSubmitting && <Spinner className="spinner--edge spinner--tiny" />}
            <button
              disabled={isSubmitting}
              className={`w-f btn btn--secondary ${isSubmitting ? 'btn--submited' : ''}`}
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
