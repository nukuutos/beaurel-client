import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import InputCustom from '../../../../../form/input-custom';
import Spinner from '../../../../../utils/spinner';
import { useSelector, useDispatch } from 'react-redux';
import asyncCall from '../../../../../../utils/async-call';
import { addServiceSuccess } from '../../../../../../redux/service/actions/service';
import { setAlert } from '../../../../../../redux/alert/actions';
import serviceSchema from '../../utils/schemas';
import InputSelectCustom from '../../../../../form/select';
import renderDurationOptions from '../../utils/render-duration-options';

const AddServiceForm = () => {
  const [{ sessionTime }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.timetable,
    state.auth,
    state.profile,
  ]);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: '',
        duration: sessionTime,
        price: '',
        date: null,
      }}
      validationSchema={serviceSchema(sessionTime)}
      onSubmit={async (values, { resetForm }) => {
        const { date, ...service } = values;

        const config = {
          method: 'post',
          url: `/profile/${profileId}/service`,
          data: { date, service },
          accessToken,
        };

        const data = await asyncCall(dispatch, config);

        if (data) {
          const { id, ...alert } = data;
          dispatch(addServiceSuccess({ service: { id, ...service } }));
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
          <InputSelectCustom className="service__input " name="duration" as="select">
            {renderDurationOptions(sessionTime)}
          </InputSelectCustom>

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
