import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import serviceSchema from '../../profile/section-cards/services/utils/schemas';
import { addServiceSuccess } from '../../../redux/service/actions/service';
import { setAlert } from '../../../redux/alert/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../../form/input';
import Select from '../../form/select';
import InputIcon from '../../form/input-icon';
import renderDurationOptions from '../utils/render-duration-options';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const AddServiceForm = () => {
  const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const dispatch = useDispatch();

  const [asyncAction, isLoading] = useAsyncAction();

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
          url: `/master/${profileId}/service`,
          data: { date, service },
          accessToken,
        };

        const data = await asyncAction(config);

        if (data) {
          const { id, ...alert } = data;
          dispatch(addServiceSuccess({ service: { id, ...service } }));
          dispatch(setAlert(alert));
          resetForm();
        }
      }}>
      {({ isSubmitting, dirty, isValidating, values }) => (
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
                <Select value={values.duration} className="input" name="duration" as="select">
                  {sessionTime ? renderDurationOptions(sessionTime) : ''}
                </Select>
              </div>
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

          <button
            disabled={isSubmitting}
            className={`add-service__button btn btn--primary mt-9 ${isLoading ? 'btn--submitted btn--spinner' : ''}`}
            type="submit">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddServiceForm;
