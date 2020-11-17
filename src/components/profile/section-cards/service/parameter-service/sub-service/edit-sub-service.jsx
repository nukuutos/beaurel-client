import React from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceStart, updateServiceSuccess } from '../../../../../../redux/service/actions';
import * as Yup from 'yup';
import asyncCall from '../../../../../../utils/async-call';
import Spinner from '../../../../../utils/spinner';
import { setAlert } from '../../../../../../redux/alert/actions';

const EditSubService = ({ subService, title, isLastService, setIsEdit }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);

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
          dispatch(updateServiceSuccess({ updatedService: { title, ...values }, updatedServiceType: 'sub-service' }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
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

export default EditSubService;
