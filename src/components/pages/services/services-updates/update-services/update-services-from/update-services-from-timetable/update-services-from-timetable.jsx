import { Formik, Form } from 'formik';
import { useSelector } from 'react-redux';
import UpdateParameterService from '../base/update-parameter-service/update-parameter-service';
import UpdateService from '../base/update-service';
import ModalHeading from '../../../../../../base/modal/modal-heading';
import useOnSubmit from '../use-on-submit/use-on-submit';
import getIsEveryServiceDurationCorrect from '../get-is-every-duration-correct';
import useGetUnsuitableServices from './use-get-unsuitable-services';

const UpdateServicesFromTimetable = ({ close }) => {
  const [{ sessionTime }, { isPhone }] = useSelector((state) => [
    state.timetable.update,
    state.screenSize,
  ]);
  const [unsuitableServices, isLoading] = useGetUnsuitableServices();
  const [handleSubmit] = useOnSubmit(close);

  const desktopClassName = isPhone ? '' : 'card';

  return isLoading ? (
    <div className={`booking-services booking-services--update ${desktopClassName}`}>
      <div className="spinner-with-background" />
    </div>
  ) : (
    <div className={`booking-services booking-services--update ${desktopClassName}`}>
      <ModalHeading titleDesktopClassName="services__heading" title="Услуги" onClickClose={close} />
      <Formik
        enableReinitialize
        initialValues={{ services: unsuitableServices }}
        onSubmit={handleSubmit}
      >
        {({ values, initialValues }) => {
          const isCorrect = getIsEveryServiceDurationCorrect(values.services, sessionTime);
          const btnDisabledClassName = isCorrect ? '' : 'btn--disabled';

          return (
            <Form className="services__container services__container--update">
              {values.services.length &&
                values.services.map((service, i) =>
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
              <button type="submit" className={`btn btn--primary ${btnDisabledClassName} mt-6`}>
                Обновить
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateServicesFromTimetable;
