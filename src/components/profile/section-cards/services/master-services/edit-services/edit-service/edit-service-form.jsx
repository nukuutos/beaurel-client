import React from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../../../../form/input-custom';
import Spinner from '../../../../../../utils/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateServiceSuccess } from '../../../../../../../redux/service/actions/service';
import { setAlert } from '../../../../../../../redux/alert/actions';
import asyncCall from '../../../../../../../utils/async-call';
import { useDispatch, useSelector } from 'react-redux';
import serviceSchema from '../../../utils/schemas';
import InputSelectCustom from '../../../../../../form/select';
import renderDurationOptions from '../../../utils/render-duration-options';

const EditServiceForm = ({ service, setIsEdit }) => {
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
        //hours: 0, duration / 60
        //mins: 0, duration % 60
        //duraion: 60
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
          dispatch(updateServiceSuccess({ updatedService: { ...service, id } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, isSubmitting, dirty }) => (
        <>
          <Form className="service service--edit mb-s-4">
            {/* избавиться от спанов? */}
            <span className="service__title">
              <InputCustom className="service__input service__input--edit" type="text" name="title" id="title" />
            </span>
            <span className="service__duration">
              {/* input custom ? */}
              <InputSelectCustom className="service__input service__input--edit" name="duration" as="select">
                {renderDurationOptions(sessionTime)}
              </InputSelectCustom>
              {/* <FontAwesomeIcon className="service__icon--display service__icon--select" icon={['fas', 'clock']} /> */}
            </span>
            <span className="service__price">
              <InputCustom className="service__input service__input--edit" type="number" name="price" id="price" />
            </span>
          </Form>

          {isSubmitting ? (
            <Spinner className="spinner--tiny spinner--gc ml-s-4 mb-s-4" />
          ) : (
            <>
              <div
                onClick={() => {
                  if (dirty) submitForm();
                  else setIsEdit(false);
                }}
                className="service__icon service__icon--manage ml-s-4 mb-s-4">
                <FontAwesomeIcon icon="check" />
              </div>
              <div onClick={() => setIsEdit(false)} className="service__icon service__icon--manage ml-s-4 mb-s-4">
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default EditServiceForm;
