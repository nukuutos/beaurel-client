import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookingService from "./booking-service";
import BookingParameterService from "./booking-parameter-service";
import useAsyncAction from "../../../../../hooks/use-async-action/use-async-action";
import { getServicesSuccess } from "../../../../../redux/service/actions/service";
import { unsetAppointmentDate } from "../../../../../redux/appointments/actions";
import { useRouter } from "next/router";
import useMediaQuery from "../../../../../hooks/use-media-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalHeading from "../../../../utils/modal/modal-heading";
import getIsViewAlert from "../../../../services/view-services/utils/get-is-view-alert";
import { getUpdateDate } from "../booking-timetable/booking-phone-timetable/utils";

const BookingServices = ({ stepState, onClickClose }) => {
  const [{ services, masterId }, { id: profileId }] = useSelector((state) => [state.services, state.profile]);
  const [asyncAction, isLoading] = useAsyncAction();
  const [servicesSwitcher, setServicesSwitcher] = useState("ordinary"); // ordinary, updated
  const dispatch = useDispatch();
  const router = useRouter();
  const isPhone = useMediaQuery(600);

  const [{ step }, setStep] = stepState;

  const getServices = async () => {
    const config = {
      method: "get",
      url: `/master/${profileId}/service`,
      accessToken: null,
    };

    const { services } = await asyncAction(config);

    if (services) {
      dispatch(getServicesSuccess({ masterId: profileId, services }));
    }
  };

  useEffect(() => {
    const isServices = masterId === router.query.id;

    if (!isServices) getServices();
  }, []);

  const onClickBack =
    step === 2
      ? () => {
          dispatch(unsetAppointmentDate());
          setStep((state) => ({ ...state, isTimetable: true, isService: false, step: state.step - 1 }));
        }
      : onClickClose;

  const servicesUpdateDate = ((services) => {
    let updateDate;

    services.some((service) => {
      const isServiceParameter = service.subServices;

      if (isServiceParameter) {
        return service.subServices.some((subService) => {
          if (subService.update) {
            updateDate = getUpdateDate(service.update);
            return true;
          }
        });
      }

      if (service.update) {
        updateDate = getUpdateDate(service.update);
        return true;
      }
    });

    return updateDate;
  })(services);

  return (
    <>
      {isLoading && isPhone && <div className="spinner-with-background" />}
      <div className={`booking-services ${isPhone ? "" : "card"}`}>
        {isLoading && !isPhone && <div className="spinner-with-background" />}
        {!isPhone && step === 2 && (
          <div onClick={onClickBack} className="booking-services__btn-back">
            <FontAwesomeIcon icon="chevron-left" /> Вернуться к выбору времени
          </div>
        )}

        <ModalHeading
          titleDesktopClassName="services__heading booking-services__heading"
          title="Выберите услугу"
          onClickClose={step === 2 ? onClickBack : onClickClose}
        />

        {/* services switcher  */}
        {step === 1 && getIsViewAlert(services) && (
          <div className="services__switch switch mt-6">
            <div
              className={`switch__label ${servicesSwitcher === "ordinary" ? "switch__label--active" : ""}`}
              onClick={() => setServicesSwitcher("ordinary")}
            >
              по {servicesUpdateDate.subtract(1, "day").format("DD.MM.YY")}
            </div>
            <div
              className={`switch__label ${servicesSwitcher === "updated" ? "switch__label--active" : ""}`}
              onClick={() => setServicesSwitcher("updated")}
            >
              c {servicesUpdateDate.format("DD.MM.YY")}
            </div>
          </div>
        )}

        <div className="services__container booking-services__container">
          {services.length ? (
            services.map((service, i) => {
              return service.subServices ? (
                <BookingParameterService
                  setStep={setStep}
                  service={service}
                  key={i}
                  isUpdated={servicesSwitcher === "updated"}
                />
              ) : (
                <BookingService
                  setStep={setStep}
                  service={service}
                  key={i}
                  isUpdated={servicesSwitcher === "updated"}
                />
              );
            })
          ) : (
            <p className="">Sorry, no services yet!</p>
          )}

          {/* {isPhone && (
          <div onClick={onClickBack} className="btn btn--primary btn--gray mt-8">
            Назад
          </div>
        )} */}
        </div>
      </div>
    </>
  );
};

export default BookingServices;
