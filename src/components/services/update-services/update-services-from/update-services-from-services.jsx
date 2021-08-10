import React from "react";
import UpdateParameterService from "./udpate-parameter-service/update-parameter-service";
import UpdateService from "./update-service";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import useAsyncAction from "../../../../hooks/use-async-action/use-async-action";
import { setAlert } from "../../../../redux/alert/actions";
import { putUpdateToServices } from "../../../../redux/service/actions/service";
import useMediaQuery from "../../../../hooks/use-media-query";
import ModalHeading from "../../../utils/modal/modal-heading";

const UpdateServicesFromServices = ({ close }) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const [{ services }, { sessionTime }, { id: masterId, accessToken }] = useSelector((state) => [
    state.services,
    state.timetable.update,
    state.auth,
  ]);
  const dispatch = useDispatch();
  const isPhone = useMediaQuery(600);

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

  const getServicesForUpdate = (services) => {
    const copiedServices = [...services];

    return copiedServices
      .filter((service) => {
        const isServiceParameter = service.subServices;

        if (isServiceParameter) {
          const filteredSubServices = service.subServices.filter(
            (subService) => subService.update.status === "unsuitable"
          );
          return filteredSubServices.length !== 0;
        }

        return service.update.status === "unsuitable";
      })
      .map((service) => {
        const isServiceParameter = service.subServices;

        if (isServiceParameter) {
          const { subServices } = service;
          service.subServices = subServices.filter((subService) => subService.update.status === "unsuitable");
        }

        return service;
      });
  };

  return (
    <div className={`booking-services ${isPhone ? "" : "card"}`}>
      {/* <h2 className="services__heading heading mt-8">Обновить услуги</h2> */}
      <ModalHeading titleDesktopClassName="services__heading" title="Обновить услуги" onClickClose={close} />
      {isLoading && <div className="spinner-with-background" />}
      <Formik
        enableReinitialize
        initialValues={{ services: getServicesForUpdate(services) }}
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
            method: "put",
            url: `/master/${masterId}/service/update`,
            data: { services: data },
            accessToken,
          };

          const alert = await asyncAction(config);

          if (alert) {
            dispatch(setAlert(alert));
            dispatch(putUpdateToServices({ services: data }));
            close();
          }
        }}
      >
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
              className={`btn btn--primary ${isDurationCorrect(values) ? "" : "btn--disabled"} mt-6`}
            >
              Обновить
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateServicesFromServices;
