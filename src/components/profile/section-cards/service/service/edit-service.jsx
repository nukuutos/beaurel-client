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
import serviceSchema from '../utils';

const EditService = ({ service, setIsEdit }) => {
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

  const { title, duration, price, id } = service;

  return (
    <Formik
      initialValues={{
        title,
        duration,
        price,
        date: null,
      }}
      validationSchema={serviceSchema(sessionTime)}
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
          dispatch(updateServiceSuccess({ updatedService: { ...service, id }, updatedServiceType: 'service' }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className="service service--edit">
            <span className="service__title mt-s">
              <InputCustom className="service--edit-title" type="text" name="title" id="title" />
            </span>
            <span className="service__duration">
              <InputCustom type="number" name="duration" id="duration" />
            </span>
            <span className="service__price">
              <InputCustom className="service__price" type="text" name="price" id="price" />
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
                className="service__icon service__icon--manage ml-m mt-s">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsEdit(false)} className="service__icon service__icon--manage ml-m mt-s">
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
