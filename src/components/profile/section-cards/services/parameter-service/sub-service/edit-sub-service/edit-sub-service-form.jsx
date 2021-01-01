import React from 'react';
import { Formik, Form } from 'formik';
import InputCustom from '../../../../../../form/input-custom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceSuccess } from '../../../../../../../redux/service/actions';
import asyncCall from '../../../../../../../utils/async-call';
import Spinner from '../../../../../../utils/spinner';
import { setAlert } from '../../../../../../../redux/alert/actions';
import { subServiceSchema } from '../../../utils/schemas';
import InputSelectCustom from '../../../../../../form/input-select-custom';
import renderDurationOptions from '../../../utils/render-duration-options';

const EditSubServiceForm = ({ subService, title, isLastService, setIsEdit }) => {
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;
  const [{ sessionTime }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.timetable,
    state.auth,
    state.profile,
  ]);

  return (
    <Formik
      initialValues={{
        parameter,
        duration,
        price,
        id,
      }}
      validationSchema={subServiceSchema(sessionTime)}
      onSubmit={async (values) => {
        const { date, ...service } = values;

        const config = {
          method: 'put',
          url: `/profile/${profileId}/service/parameter/${title}/sub-service/${id}`,
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
          <Form className={`service service--edit ${isLastService ? 'mb-s-4' : ''}`}>
            <span className={`service__parameter ${isLastService ? 'service__parameter--last' : ''}`}>
              <InputCustom
                className="service__input service__input--edit"
                type="text"
                name="parameter"
                id="parameter"
              />
            </span>
            <span className="service__duration">
              {/* <InputCustom
                className="service__input service__input--edit"
                type="number"
                name="duration"
                id="duration"
              /> */}
              <InputSelectCustom className="service__input service__input--edit" name="duration" as="select">
                {renderDurationOptions(sessionTime)}
              </InputSelectCustom>
            </span>
            <span className={`service__price service__price--parameter ${isLastService ? 'service__price--last' : ''}`}>
              <InputCustom className="service__input service__input--edit" type="text" name="price" id="price" />
            </span>
          </Form>
          {isSubmitting ? (
            <Spinner className={`spinner--tiny spinner--gc ml-s-4 ${isLastService ? 'mb-s-4' : ''}`} />
          ) : (
            <>
              <div
                onClick={() => {
                  if (dirty) submitForm();
                  else setIsEdit(false);
                }}
                className={`service__icon service__icon--manage ml-s-4 ${isLastService ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="check" />
              </div>
              <div
                onClick={() => setIsEdit(false)}
                className={`service__icon service__icon--manage ml-s-4 ${isLastService ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="times" />
              </div>
            </>
          )}
        </>
      )}
    </Formik>
  );
};

export default EditSubServiceForm;
