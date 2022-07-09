import { Form } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import getIsEveryServiceDurationCorrect from '../get-is-every-duration-correct';
import UpdateParameterService from './update-parameter-service/update-parameter-service';
import UpdateService from './update-service';

const UpdateForm = ({ values, initialValues, submitForm }) => {
  const { sessionTime } = useSelector((state) => state.timetable.update);
  const { services } = values;

  const isCorrect = getIsEveryServiceDurationCorrect(services, sessionTime);
  const btnDisabledClassName = isCorrect ? '' : 'btn--disabled';

  return (
    <div className="services__container services__container--update">
      {services.length &&
        services.map((service, i) =>
          service.subServices ? (
            <UpdateParameterService
              key={service.id}
              initialValues={initialValues}
              index={i}
              values={values}
            />
          ) : (
            <UpdateService
              key={service.id}
              index={i}
              values={values}
              initialValues={initialValues}
            />
          )
        )}
      <button
        onClick={submitForm}
        type="button"
        className={`btn btn--primary ${btnDisabledClassName} mt-6`}
      >
        Обновить
      </button>
    </div>
  );
};

export default UpdateForm;
