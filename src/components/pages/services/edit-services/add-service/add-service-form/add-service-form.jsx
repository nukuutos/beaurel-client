import React from 'react';
import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import { serviceSchema } from '../../../utils/schemas';
import useOnSubmit from './use-on-submit';
import useIsUpdateDuration from '../use-is-update-duration';
import Title from '../shared/title';
import UpdateDuration from '../shared/update-duration';
import Duration from '../shared/duration';
import Price from '../shared/price';

const AddServiceForm = ({ onClickClose }) => {
  const { sessionTime, update } = useSelector((state) => state.timetable);

  // updateDurationOptions
  const isUpdateDuration = useIsUpdateDuration();

  const [handleSubmit] = useOnSubmit(onClickClose);

  return (
    <Formik
      initialValues={{
        title: '',
        duration: sessionTime,
        price: '',
        updateDuration: update?.sessionTime || null,
      }}
      validationSchema={serviceSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, values }) => (
        <Form className="add-service__form">
          {isSubmitting && <div className="spinner-with-background" />}
          <Title className="add-service__title mt-5" />
          <div className="add-service__price-and-duration mt-4">
            <Duration
              className="add-service__duration"
              name="duration"
              inputClassName="input--icon input--mini mr-4"
              value={values.duration}
            />

            <Price name="price" />
          </div>

          {isUpdateDuration && (
            <UpdateDuration
              name="updateDuration"
              value={values.updateDuration}
              updateDate={update.date}
            />
          )}

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
