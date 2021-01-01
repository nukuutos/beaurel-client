import React, { Fragment } from 'react';
import { FieldArray, Formik, Form, ErrorMessage } from 'formik';
import InputCustom from '../../../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { addServiceSuccess } from '../../../../../../redux/service/actions';
import asyncCall from '../../../../../../utils/async-call';
import { setAlert } from '../../../../../../redux/alert/actions';
import Spinner from '../../../../../utils/spinner';
import { parameterServiceSchema } from '../../utils/schemas';
import InputSelectCustom from '../../../../../form/input-select-custom';
import renderDurationOptions from '../../utils/render-duration-options';

const AddSubServicesForm = () => {
  const [sessionTime, accessToken] = useSelector((state) => [state.timetable.sessionTime, state.auth.accessToken]);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        title: '',
        subServices: [{ parameter: '', duration: sessionTime, price: '' }],
        date: null,
      }}
      validationSchema={parameterServiceSchema(sessionTime)}
      onSubmit={async (values, { resetForm }) => {
        const { date, ...service } = values;

        const config = {
          method: 'post',
          url: '/profile//service/parameter',
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
      {({ values, isSubmitting }) => (
        <Form className={`services__form ${values.subServices.length !== 1 ? 'services__form--sub-service' : ''}`}>
          <label className="service__label" htmlFor="title">
            Title
          </label>
          <InputCustom className="service__input" type="text" name="title" id="title" />
          <ErrorMessage name="title">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage>

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

                      <label className="service__label" htmlFor={`subServices.${i}.duration`}>
                        Duration
                      </label>
                      <InputSelectCustom className="service__input " name="duration" as="select">
                        {renderDurationOptions(sessionTime)}
                      </InputSelectCustom>
                      {i !== 0 && (
                        <div
                          onClick={() => remove(i)}
                          className="service__icon service__icon--manage ml-s-4 service__icon--delete">
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
                        type="number"
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
                  className="service--add mt-s-3 gc-f"
                  onClick={() => push({ parameter: '', duration: '', price: '' })}>
                  <FontAwesomeIcon icon="plus" />
                </div>
              </>
            )}
          </FieldArray>
          <div className={`mt-s-3 display-flex gc-f p-r ${values.subServices.length !== 1 ? 'mb-s-6' : ''}`}>
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

export default AddSubServicesForm;
