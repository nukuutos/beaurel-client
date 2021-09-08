import React from "react";
import convertDateToString from "../../appointments/appointment/utils/convert-date-to-string";
import { useSelector } from "react-redux";

const findUpdateDate = (services) => {
  let indexes = { service: null, subService: null };

  services.some((service, serviceIndex) => {
    const isServiceParamter = service.subServices;

    if (isServiceParamter) {
      return service.subServices.some((subService, subServiceIndex) => {
        if (subService.update && subService.update.date) {
          indexes = { service: serviceIndex, subService: subServiceIndex };
          return true;
        }
      });
    }

    if (service.update && service.update.date) {
      indexes.service = serviceIndex;
      return true;
    }
  });

  const { service: serviceIndex, subService: subServiceIndex } = indexes;

  let updateDate;

  if (subServiceIndex || subServiceIndex === 0) {
    updateDate = services[serviceIndex].subServices[subServiceIndex].update.date;
  } else updateDate = services[serviceIndex].update.date;

  return convertDateToString(new Date(updateDate));
};

const ViewAlert = ({ setIsUpdateServices }) => {
  const { services } = useSelector((state) => state.services);

  return (
    <div className="services__update-alert update-alert mt-6">
      <p className="update-alert__text">
        Ваши услуги с <span className="update-alert__date">{findUpdateDate(services)}</span>
      </p>
      <button
        onClick={() => setIsUpdateServices((state) => ({ ...state, view: true }))}
        className="udpate-alert__button btn btn--secondary btn--flat ml-5"
      >
        Посмотреть
      </button>
    </div>
  );
};

export default ViewAlert;
