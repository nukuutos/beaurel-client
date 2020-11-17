import React from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../../form/input-custom';
import Spinner from '../../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateServiceSuccess } from '../../../../../redux/service/actions';
import { setAlert } from '../../../../../redux/alert/actions';
import asyncCall from '../../../../../utils/async-call';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const EditService = ({ service, setIsEdit }) => {
  const { title, duration, price, id } = service;
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

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

  return (
    <Formik
      initialValues={{
        title,
        duration,
        price,
        date: null,
      }}
      validationSchema={editServiceSchema}
      onSubmit={async (values) => {
        const { date, ...service } = values;

        const config = {
          method: 'put',
          url: `/profile/5eb849b81c2ccc21306ced34/service/${id}`,
          data: { date, service },
          accessToken,
        };

        const alert = await asyncCall(dispatch, config);

        if (alert) {
          // const { alert } = data;
          dispatch(updateServiceSuccess({ updatedService: { ...service, id }, updatedServiceType: 'service' }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
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
          {isSubmitting ? (
            <Spinner className="spinner--tiny spinner--gc ml-s mt-s" />
          ) : (
            <>
              <div
                onClick={() => {
                  if (dirty) submitForm();
                  else setIsEdit(false);
                }}
                className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsEdit(false)} className="service__icon service__icon--manage">
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default EditService;
