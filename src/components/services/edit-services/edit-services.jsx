import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditParameterService from "./edit-parameter-service/edit-parameter-service";
import EditService from "./edit-service/edit-service";
import AddService from "../add-service/add-service";
import Modal from "../../utils/modal";

const EditServices = ({ services }) => {
  const { isPublicView } = useSelector((state) => state.profile); // add public view
  const [isAddService, setIsAddService] = useState(false);

  return (
    <div className="services__container">
      {services.length ? (
        services.map((service, i) => {
          return service.subServices ? (
            <EditParameterService key={i} service={service} />
          ) : (
            <EditService key={i} service={service} />
          );
        })
      ) : (
        // change it
        <p></p>
      )}

      <div className="service service--add service--hover card mt-6" onClick={() => setIsAddService(true)}>
        <FontAwesomeIcon icon="plus" />
      </div>

      {isAddService && <AddService onClickClose={() => setIsAddService(false)} />}
    </div>
  );
};

export default EditServices;
