import React from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { serviceSchema } from '../../../utils/schemas';
import Input from '../../../../../base/form/input';
import Select from '../../../../../base/form/select';
import InputIcon from '../../../../../base/form/input-icon';
import useOnSubmit from './use-on-submit';
import useDurationOptions from '../../../hooks/use-duration-options/use-duration-options';

const AddServiceForm = ({ onClickClose }) => {
  const { sessionTime } = useSelector((state) => state.timetable);

  const durationOptions = useDurationOptions();

  const [handleSubmit] = useOnSubmit(onClickClose);

  const schema = serviceSchema(sessionTime);

  return (
    <Formik
      initialValues={{
        title: '',
        duration: sessionTime,
        price: '',
      }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="add-service__form">
          {isSubmitting && <div className="spinner-with-background" />}
          <div className="add-service__title mt-5">
            <label className="label" htmlFor="title">
              Название
            </label>
            <Input className="input" type="text" name="title" id="title" />
            <ErrorMessage name="title">
              {(msg) => <div className="error mt-1">{msg}</div>}
            </ErrorMessage>
          </div>

          <div className="add-service__price-and-duration mt-6">
            <div className="add-service__duration">
              <label className="label " htmlFor="duration">
                Длительность
              </label>
              <div className="input--icon input--mini mr-4">
                <FontAwesomeIcon className="input__icon input__icon--m" icon="clock" />
                <Select value={values.duration} className="input" name="duration" as="select">
                  {durationOptions}
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
                inputClassName="input ml-1"
                wrapperClassName="input--icon input--mini"
              >
                <FontAwesomeIcon className="input__icon input__icon--m" icon="ruble-sign" />
              </InputIcon>
              <ErrorMessage name="price">
                {(msg) => <div className="error mt-1">{msg}</div>}
              </ErrorMessage>
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className={`add-service__button btn btn--primary mt-9 `}
            type="submit"
          >
            Добавить
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddServiceForm;
