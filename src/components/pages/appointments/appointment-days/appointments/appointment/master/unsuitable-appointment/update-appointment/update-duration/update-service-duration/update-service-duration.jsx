import React from 'react';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DurationOptions from '../../../../../../../../../services/duration-options/duration-options';
import { updateServiceDurationSchema } from '../../../../../../../../../services/utils/schemas';
import InputIcon from '../../../../../../../../../../base/form/input-icon';
import Input from '../../../../../../../../../../base/form/input';
import Select from '../../../../../../../../../../base/form/select';
import getInputClassName from '../../../../../../../../../services/services-updates/update-services/update-services-from/base/get-input-class-name';
import displayDuration from '../../utils/display-duration';
import { setAppointmentService } from '../../../../../../../../../../../redux/appointments/actions';
import getDisabledClassName from './get-disabled-class-name';

const UpdateServiceDuration = ({ setStep }) => {
  const [service, { sessionTime, update }] = useSelector((state) => [
    state.appointments.booking.bookingAppointment.service,
    state.timetable,
  ]);

  const dispatch = useDispatch();

  const isUpdateSessionTime = update?.sessionTime;
  const correctSessionTime = isUpdateSessionTime ? update.sessionTime : sessionTime;
  const initialDuration = displayDuration(service?.duration || 60);

  const schema = updateServiceDurationSchema(sessionTime);

  const goToTimetable = () => setStep(2);

  return (
    <Formik
      initialValues={{
        title: service?.title,
        duration: service?.duration,
        price: service?.price,
      }}
      enableReinitialize
      validationSchema={schema}
      onSubmit={(values) => {
        dispatch(
          setAppointmentService({ ...service, duration: values.duration, isAfterUpdate: true })
        );
        goToTimetable();
      }}
    >
      {({ values }) => {
        const durationClassName = getInputClassName(values.duration, correctSessionTime);
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
              <div className="add-service__duration">
                <label className="label " htmlFor="duration">
                  Длительность
                </label>
                <div className={`${durationClassName} input--icon input--mini mr-4`}>
                  <FontAwesomeIcon className="input__icon input__icon--m" icon="clock" />
                  <Select value={values.duration} className="input" name="duration" as="select">
                    <option className="input__hide">{initialDuration}</option>
                    <DurationOptions isUpdate={isUpdateSessionTime} />
                  </Select>
                </div>
              </div>

              <div className="add-service__price add-service__price--disabled">
                <label className="label " htmlFor="price">
                  Цена
                </label>
                <InputIcon
                  disabled
                  type="number"
                  name="price"
                  inputClassName="input ml-1"
                  wrapperClassName="input--icon input--mini"
                >
                  <FontAwesomeIcon className="input__icon input__icon--m" icon="ruble-sign" />
                </InputIcon>
              </div>
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
