import React from 'react';
import UpdateParameterService from './udpate-parameter-service/update-parameter-service';
import UpdateService from './update-service';
import Modal from '../../utils/modal';
import { useSelector } from 'react-redux';
import services from './services';
import { Formik, Form } from 'formik';

const UpdateServices = () => {
  // we need updated sessionTime
  // const [{ services }] = useSelector((state) => [state.services, state.timetable]);
  const sessionTime = 240;

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

  const servicesForUpdate = services
    .filter((service) => {
      const isServiceParameter = service.subServices;

      if (isServiceParameter) {
        const filteredSubServices = service.subServices.filter(
          (subService) => subService.update.status === 'unsuitable'
        );
        return filteredSubServices.length !== 0;
      }

      return service.update.status === 'unsuitable';
    })
    .map((service) => {
      const isServiceParameter = service.subServices;

      if (isServiceParameter) {
        const { subServices } = service;
        service.subServices = subServices.filter((subService) => subService.update.status === 'unsuitable');
      }

      return service;
    });

  // services: [{subServices: [{service}], ... }, {service, ... } ]
  // services.0.subServices.0.duration
  // services.1.duration
  // after editing of duration, duration becomes String!

  return (
    <Modal onClickClose={null}>
      <div className="booking-services card">
        <h2 className="services__heading heading mt-8">Услуги</h2>
        <Formik
          initialValues={{ services: servicesForUpdate }}
          onSubmit={async (values) => {
            const data = [];

            values.services.forEach((service) => {
              const isServiceParameter = service.subServices;

              if (isServiceParameter) {
                service.subServices.forEach(({ id, duration }) => data.push({ id, duration }));
              } else data.push({ id: service.id, duration: service.duration });
            });

            // async call
          }}>
          {({ values, initialValues }) => (
            <Form className="services__container">
              {servicesForUpdate.map((service, i) => {
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
    </Modal>
  );
};

export default UpdateServices;
