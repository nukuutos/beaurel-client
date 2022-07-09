import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';
import Title from './title';
import { updateSubServiceDurationSchema } from '../../../../../../../../../../services/utils/schemas';
import getDisabledClassName from '../update-service-duration/get-disabled-class-name';
import useHandleSubmit from '../../use-handle-submit';
import useSessionTime from '../../use-session-time';
import Parameter from '../parameter';
import Price from '../price';
import Duration from '../duration/duration';

const UpdateSubServiceDuration = ({ setStep }) => {
  const service = useSelector((state) => state.appointments.booking.bookingAppointment.service);

  const { correctSessionTime } = useSessionTime(setStep);
  const handleSubmit = useHandleSubmit(setStep);

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
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        const disabledClassName = getDisabledClassName(values.duration, correctSessionTime);

        return (
          <Form className="add-service__form">
            <Title />

            <Parameter />

            <div className="add-service__price-and-duration mt-6">
              <Price />
              <Duration values={values} />
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
