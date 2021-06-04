import React, { useEffect, useState } from 'react';
import UpdateParameterService from './udpate-parameter-service/update-parameter-service';
import UpdateService from './update-service';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../redux/alert/actions';
import { putUpdateToServices } from '../../../../redux/service/actions/service';

const UpdateServicesFromTimetable = ({ close }) => {
  const [unsuitableServices, setUnsuitableServices] = useState([]);
  const [asyncAction, isLoading, isCancelled] = useAsyncAction();
  const [{ sessionTime }, servicesState, { id: masterId, accessToken }] = useSelector((state) => [
    state.timetable.update,
    state.services,
    state.auth,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUnsuitableServices = async () => {
      const config = {
        method: 'get',
        url: `/master/${masterId}/service/update`,
        accessToken,
      };

      const data = await asyncAction(config);

      if (data && !isCancelled.current) setUnsuitableServices(data.unsuitableServices);
    };

    if (!unsuitableServices.length) getUnsuitableServices();
  }, []);

  const isDurationCorrect = (values) =>
    values.services.every((service) => {
      const isServiceParameter = service.subServices;

      if (isServiceParameter) {
        const isSubServicesDurationCorrect = service.subServices.every(
          (subService) => subService.duration % sessionTime === 0
        );
        return isSubServicesDurationCorrect;
      }

      return service.duration % sessionTime === 0;
    });

  return (
    <div className="booking-services card">
      <h2 className="services__heading heading mt-8">Услуги</h2>
      {isLoading && <div className="spinner-with-background" />}
      <Formik
        enableReinitialize
        initialValues={{ services: unsuitableServices }}
        onSubmit={async (values) => {
          const data = [];

          values.services.forEach((service) => {
            const isServiceParameter = service.subServices;

            if (isServiceParameter) {
              service.subServices.forEach(({ id, duration }) => data.push({ id, duration }));
            } else data.push({ id: service.id, duration: service.duration });
          });

          // async call
          const config = {
            method: 'put',
            url: `/master/${masterId}/service/update`,
            data: { services: data },
            accessToken,
          };

          const alert = await asyncAction(config);

          if (alert) {
            dispatch(setAlert(alert));
            if (servicesState.services.length && servicesState.masterId === masterId) {
              dispatch(putUpdateToServices({ services: data }));
            }
            close();
          }
        }}>
        {({ values, initialValues }) => (
          <Form className="services__container">
            {values.services.length &&
              values.services.map((service, i) => {
                return service.subServices ? (
                  <UpdateParameterService key={i} initialValues={initialValues} index={i} values={values} />
                ) : (
                  <UpdateService key={i} index={i} values={values} initialValues={initialValues} />
                );
              })}
            <button
              type="submit"
              className={`btn btn--primary ${isDurationCorrect(values) ? '' : 'btn--disabled'} mt-6`}>
              Обновить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateServicesFromTimetable;
