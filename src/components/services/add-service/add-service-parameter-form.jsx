import React, { Fragment } from 'react';
import { FieldArray, Formik, Form, ErrorMessage } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import { parameterServiceSchema } from '../../profile/section-cards/services/utils/schemas';
import { addServiceParameterSuccess } from '../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../redux/alert/actions';
import renderDurationOptions from '../../profile/section-cards/services/utils/render-duration-options';
import Input from '../../form/input';
import Select from '../../form/select';
import InputIcon from '../../form/input-icon';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const AddSubServicesForm = () => {
  const [{ sessionTime }, { accessToken, id: profileId }] = useSelector((state) => [state.timetable, state.auth]);
  const [asyncAction, isLoading] = useAsyncAction();

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
          url: `/profile/${profileId}/service/parameter`,
          data: { date, service },
          accessToken,
        };

        const data = await asyncAction(config);

        if (data) {
          const { ids, ...alert } = data;
          dispatch(addServiceParameterSuccess({ service: { ids, ...service } }));
          dispatch(setAlert(alert));
          resetForm();
        }
      }}>
      {({ values, isSubmitting }) => (
        <Form
          className={`add-service__form ${values.subServices.length !== 1 ? 'add-service__form--sub-service' : ''}`}>
          <div className="add-service__title mt-5">
            <label className="label " htmlFor="title">
              Название
            </label>
            <Input className="input" type="text" name="title" id="title" />
            <ErrorMessage name="title">{(msg) => <div className="error mt-1">{msg}</div>}</ErrorMessage>
          </div>

          <FieldArray name="subServices">
            {({ remove, push }) => (
              <>
                {values.subServices.map((subService, i) => {
                  return (
                    <Fragment key={i}>
                      <div className="add-service__title add-service__parameter mt-4">
                        <label className="label " htmlFor="title">
                          Параметр
                        </label>
                        <Input
                          className="input"
                          type="text"
                          name={`subServices.${i}.parameter`}
                          id={`subServices.${i}.parameter`}
                        />
                        <ErrorMessage name={`subServices.${i}.parameter`}>
                          {(msg) => <div className="error mt-1">{msg}</div>}
                        </ErrorMessage>
                      </div>

                      {i !== 0 && (
                        <div
                          onClick={() => remove(i)}
                          className="add-service__delete btn-icon btn-icon--fail mb-1 mr-2">
                          <FontAwesomeIcon icon="trash" />
                        </div>
                      )}

                      <div className="add-service__duration mt-6">
                        <label className="label" htmlFor={`subServices.${i}.duration`}>
                          Длительность
                        </label>
                        <div className="input--icon">
                          <FontAwesomeIcon className="input__icon input__icon--m" icon="clock" />
                          <Select
                            value={subService.duration}
                            className="input"
                            name={`subServices.${i}.duration`}
                            as="select">
                            {renderDurationOptions(sessionTime)}
                          </Select>
                        </div>
                      </div>

                      <div className="add-service__price mt-6">
                        <label className="label " htmlFor={`subServices.${i}.price`}>
                          Цена
                        </label>
                        <InputIcon
                          type="number"
                          name={`subServices.${i}.price`}
                          inputClassName={'input'}
                          wrapperClassName={'input--icon input--mini'}>
                          <FontAwesomeIcon className="input__icon input__icon--m" icon="ruble-sign" />
                        </InputIcon>
                        <ErrorMessage name={`subServices.${i}.price`}>
                          {(msg) => <div className="error mt-1">{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </Fragment>
                  );
                })}
                <div
                  className="add-service__add card mt-6"
                  onClick={() => push({ parameter: '', duration: '', price: '' })}>
                  <FontAwesomeIcon icon="plus" />
                </div>
              </>
            )}
          </FieldArray>
          <button
            disabled={isSubmitting}
            className={`add-service__button mt-9 btn btn--primary ${isLoading ? 'btn--submitted btn--spinner' : ''}`}
            type="submit">
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddSubServicesForm;
