import React from 'react';
import { Formik, Form } from 'formik';
import { updateServiceDurationSchema } from '../../../../../../../../../../services/utils/schemas';
import Input from '../../../../../../../../../../../base/form/input';
import getDisabledClassName from './get-disabled-class-name';
import useSessionTime from '../../use-session-time';
import Price from '../price';
import Duration from '../duration/duration';

const UpdateServiceDuration = ({ service, updateDuration }) => {
  const { correctSessionTime } = useSessionTime();

  const schema = updateServiceDurationSchema(correctSessionTime);

  return (
    <Formik
      initialValues={{
        title: service?.title || '',
        duration: service?.duration || 0,
        price: service?.price || 0,
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={updateDuration}
    >
      {({ values }) => {
        const disabledClassName = getDisabledClassName(values.duration, correctSessionTime);

        return (
          <Form className="add-service__form">
            <div className="add-service__title add-service__title--disabled">
              <label className="label" htmlFor="title">
                Название
              </label>
              <Input disabled className="input" type="text" name="title" id="title" />
            </div>

            <div className="add-service__price-and-duration mt-6">
              <Duration service={service} values={values} />
              <Price />
            </div>

            <button
              className={`add-service__button btn btn--primary mt-9 ${disabledClassName}`}
              type="submit"
            >
              Далее
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default UpdateServiceDuration;
