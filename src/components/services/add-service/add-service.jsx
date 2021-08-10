import React, { useState } from "react";
import useMediaQuery from "../../../hooks/use-media-query";
import AddServiceForm from "./add-service-form";
import AddSubServicesForm from "./add-service-parameter-form";
import Modal from "../../utils/modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddService = ({ onClickClose }) => {
  const isPhone = useMediaQuery(600);
  const [serviceType, setServiceType] = useState("service"); // service or subservice

  // descrition: forms contain select element that must have value that is not null.
  // descrition: firstly isloading = false and only then we are dispatching sessionTime to store
  return (
    <Modal onClickClose={onClickClose} isMobileBackground>
      <div className={`add-service ${isPhone ? "" : "card"}`}>
        {isPhone && (
          <nav className={`modal__back-bar card card--layout`}>
            <div className="back-bar__main">
              <FontAwesomeIcon onClick={onClickClose} className="back-bar__icon mr-6" icon="arrow-left" />
              Добавить услугу
            </div>
          </nav>
        )}

        {!isPhone && <h2 className="add-service__heading heading">Добавить yслугу</h2>}
        <div className={`add-service__switch ${isPhone ? "" : "mt-7"}`}>
          <div className="add-service__switch-label">С параметрами</div>
          <div className="switch">
            <div
              className={`switch__label ${serviceType === "service" ? "switch__label--active" : ""}`}
              htmlFor="service"
              onClick={() => setServiceType("service")}
            >
              Нет
            </div>
            <div
              className={`switch__label ${serviceType === "parameter" ? "switch__label--active" : ""}`}
              htmlFor="service-parameter"
              onClick={() => setServiceType("parameter")}
            >
              Да
            </div>
          </div>
        </div>
        {serviceType === "service" ? (
          <AddServiceForm onClickClose={onClickClose} />
        ) : (
          <AddSubServicesForm onClickClose={onClickClose} />
        )}
      </div>
    </Modal>
  );
};

export default AddService;
