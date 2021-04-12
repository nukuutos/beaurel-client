import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { updateServiceSuccess } from '../../../../redux/service/actions/service';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';
import serviceSchema from '../../utils/schemas';
import renderDurationOptions from '../../../profile/section-cards/services/utils/render-duration-options';
import Textarea from '../../../form/textarea';
import Select from '../../../form/select';
import useAsyncAction from '../../../../hooks/useAsyncAction';
import InputIcon from '../../../form/input-icon';

const EditServiceForm = ({ service, setIsEdit }) => {
  const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();
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
          url: `/profile/${profileId}/service/${id}`,
          data: { date, service },
          accessToken,
        };
        const alert = await asyncAction(config);
        if (alert) {
          dispatch(updateServiceSuccess({ updatedService: { ...service, id } }));
          dispatch(setAlert(alert));
          setIsEdit(false);
        }
      }}>
      {({ submitForm, values, dirty }) => (
        <>
          <Form className="service">
            {/* избавиться от спанов? */}
            <div className="service__title">
              <Textarea className="textarea textarea--s service__textarea input" type="text" name="title" />
              <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
            </div>

            <div className="service__duration service__attribute--edit input--icon">
              <FontAwesomeIcon className="input__icon input__icon--s" icon="clock" />
              <Select value={values.duration} className="input input--mini" name="duration" as="select">
                {renderDurationOptions(sessionTime)}
              </Select>
            </div>

            <div className="service__horizontal-line service__horizontal-line--edit mt-1 mb-1" />

            {/* change service__attribute--edit to one */}
            <div className="service__price service__price-area">
              <InputIcon
                type="number"
                name="price"
                inputClassName={'input input--mini'}
                wrapperClassName={'input--icon service__attribute--edit'}>
                <FontAwesomeIcon className="input__icon input__icon--s" icon="ruble-sign" />
              </InputIcon>
            </div>
            <ErrorMessage name="price">
              {(msg) => <div className="service__price-area error mt-1">{msg}</div>}
            </ErrorMessage>
            {isLoading ? (
              <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
            ) : (
              <>
                <div
                  onClick={() => {
                    if (dirty) submitForm();
                    else setIsEdit(false);
                  }}
                  className="service__btn service__btn--first btn--edit btn--hover-success">
                  <FontAwesomeIcon icon="check" />
                </div>
                <div onClick={() => setIsEdit(false)} className="service__btn btn--edit btn--hover-fail">
                  <FontAwesomeIcon icon="times" />
                </div>
              </>
            )}
          </Form>
        </>
      )}
    </Formik>
  );
};

export default EditServiceForm;
