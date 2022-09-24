import { Form, Formik } from 'formik';
import Title from './title';
import { updateSubServiceDurationSchema } from '../../../../../../../../../../services/utils/schemas';
import getDisabledClassName from '../update-service-duration/get-disabled-class-name';
import useSessionTime from '../../use-session-time';
import Parameter from '../parameter';
import Price from '../price';
import Duration from '../duration/duration';

const UpdateSubServiceDuration = ({ service, updateDuration }) => {
  const { correctSessionTime } = useSessionTime();

  const schema = updateSubServiceDurationSchema(correctSessionTime);

  return (
    <Formik
      initialValues={{
        title: service?.title,
        parameter: service?.parameter,
        duration: service?.duration,
        price: service?.price,
      }}
      validationSchema={schema}
      onSubmit={updateDuration}
    >
      {({ values }) => {
        const disabledClassName = getDisabledClassName(values.duration, correctSessionTime);

        return (
          <Form className="add-service__form">
            <Title />

            <Parameter />

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

export default UpdateSubServiceDuration;
