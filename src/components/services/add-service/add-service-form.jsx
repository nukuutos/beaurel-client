import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import serviceSchema from '../../profile/section-cards/services/utils/schemas';
import asyncCall from '../../../utils/async-call';
import { addServiceSuccess } from '../../../redux/service/actions/service';
import { setAlert } from '../../../redux/alert/actions';
import InputCustom from '../../form/input-custom';
import Spinner from '../../utils/spinner';
import renderDurationOptions from '../../profile/section-cards/services/utils/render-duration-options';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../form/input';
import Select from '../../form/select';
import InputIcon from '../../form/input-icon';

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
        <Form className="add-service__form">
          <div className="add-service__title mt-5">
            <label className="label" htmlFor="title">
              Название
            </label>
            <Input className="input" type="text" name="title" id="title" />
            <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
          </div>

          <div className="add-service__price-and-duration mt-6">
            <div className="add-service__duration">
              <label className="label " htmlFor="duration">
                Длительность
              </label>
              <div className="input--icon input--mini">
                <FontAwesomeIcon className="input__icon input__icon--m" icon="clock" />
                <Select className="input" name="duration" as="select">
                  {renderDurationOptions(sessionTime)}
                </Select>
              </div>
              {/* <ErrorMessage name="duration">{(msg) => <div className="service__error">{msg}</div>}</ErrorMessage> */}
            </div>

            <div className="add-service__price">
              <label className="label " htmlFor="price">
                Цена
              </label>
              <InputIcon
                type="number"
                name="price"
                inputClassName={'input'}
                wrapperClassName={'input--icon input--mini'}>
                <FontAwesomeIcon className="input__icon input__icon--m" icon="ruble-sign" />
              </InputIcon>
              <ErrorMessage name="price">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
            </div>
          </div>

          {/* <div className="add-service__buttons mt-9 mb-7"> */}
          {/* {isSubmitting && <Spinner className="spinner--edge spinner--tiny" />} */}
          <button
            disabled={isSubmitting}
            className={`add-service__button btn btn--primary mt-9 ${isSubmitting ? 'btn--submited' : ''}`}
            type="submit">
            Добавить
          </button>
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default AddServiceForm;
