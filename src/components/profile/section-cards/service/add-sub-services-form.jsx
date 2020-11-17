import React, { Fragment } from 'react';
import { FieldArray, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputCustom from '../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { addServiceStart, addServiceSuccess } from '../../../../redux/service/actions';
import asyncCall from '../../../../utils/async-call';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';

const AddSubServicesForm = () => {
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

  const addSubServicesSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(3, 'Minimum length is 3 characters')
      .max(30, 'Maximum length is 30 characters')
      .required('Field is required'),

    subServices: Yup.array().of(
      Yup.object().shape({
        parameter: Yup.string()
          .trim()
          .min(2, 'Minimum length is 2 characters')
          .max(20, 'Maximum length is 20 characters')
          .required('Field is required'),
        duration: Yup.number()
          .positive('Duration can not be negative')
          .integer('Duration must be an integer')
          .max(480, 'Duration can not be more than 8 hours')
          .test(
            'duration',
            'This duration is not suitable for session time',
            (duration) => duration % sessionTime === 0
          )

          .required('Duration is required'),
        price: Yup.number()
          .positive('Price can not be negative')
          .integer('Price must be an integer')
          .max(30000, 'Price is too big'),
      })
    ),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        subServices: [{ parameter: '', duration: '', price: '' }],
        date: null,
      }}
      validationSchema={addSubServicesSchema}
      onSubmit={async (values, { resetForm }) => {
        const { date, ...service } = values;

        const config = {
          method: 'post',
          url: '/profile/5eb849b81c2ccc21306ced34/service',
          data: { date, service },
          accessToken,
        };

        const data = await asyncCall(dispatch, config);
        // dispatch(addServiceStart(values));

        if (data) {
          const { ids, ...alert } = data;
          dispatch(addServiceSuccess({ service: { ids, ...service } }));
          dispatch(setAlert(alert));
          resetForm();
        }
      }}>
      {({ values, isSubmitting }) => (
        <Form
          className={`services--add-service ${
            values.type === 'parameters' && values.subServices.length !== 1 && 'services--add-sub-service'
          }`}>
          <label className="service__label" htmlFor="title">
            Title
          </label>
          <InputCustom className="service__input" type="text" name="title" id="title" />
          <ErrorMessage name="title">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage>

          {/* {errors.service && errors.service.title && <div>{errors.service.title}</div>} */}

          <FieldArray name="subServices">
            {({ remove, push }) => (
              <>
                {values.subServices.map((subService, i) => {
                  return (
                    <Fragment key={i}>
                      <label
                        className="service__label service__parameter--adding"
                        htmlFor="parameter"
                        htmlFor={`subServices.${i}.parameter`}>
                        Parameter
                      </label>
                      <InputCustom
                        className="service__input align-self-end"
                        type="text"
                        name={`subServices.${i}.parameter`}
                        id={`subServices.${i}.parameter`}
                      />
                      <ErrorMessage name={`subServices.${i}.parameter`}>
                        {(msg) => <div className="service__error">{msg}</div>}
                      </ErrorMessage>
                      {/* {errors.subServices && errors.subServices[i] && errors.subServices[i].parameter && (
                        <div>{errors.subServices[i].parameter}</div>
                      )} */}
                      <label className="service__label" htmlFor={`subServices.${i}.duration`}>
                        Duration
                      </label>
                      <InputCustom
                        className="service__input"
                        type="number"
                        name={`subServices.${i}.duration`}
                        id={`subServices.${i}.duration`}
                      />
                      {i !== 0 && (
                        <div
                          onClick={() => remove(i)}
                          className="service__icon service__icon--manage service__icon--delete">
                          <FontAwesomeIcon icon="trash" />
                        </div>
                      )}
                      <ErrorMessage name={`subServices.${i}.duration`}>
                        {(msg) => <div className="service__error">{msg}</div>}
                      </ErrorMessage>

                      <label className="service__label" htmlFor={`subServices.${i}.price`}>
                        Price
                      </label>
                      <InputCustom
                        className="service__input"
                        type="text"
                        name={`subServices.${i}.price`}
                        id={`subServices.${i}.price`}
                      />
                      <ErrorMessage name={`subServices.${i}.price`}>
                        {(msg) => <div className="service__error">{msg}</div>}
                      </ErrorMessage>
                    </Fragment>
                  );
                })}
                <div
                  className="service--add service--add-sub-service"
                  onClick={() => push({ parameter: '', duration: '', price: '' })}>
                  <FontAwesomeIcon icon="plus" />
                </div>
              </>
            )}
          </FieldArray>
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

export default AddSubServicesForm;
