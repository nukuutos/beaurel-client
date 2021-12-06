import React, { useState } from "react";
import EditSubService from "./edit-sub-service/edit-sub-service";
import EditTitle from "./edit-title/edit-title";

const EditParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const { title, subServices, order } = service;

  return (
    <div className={`${!isHoverSubService && isShown ? "service-parameter--hover" : ""} service-parameter card mt-6`}>
      <EditTitle service={service} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <EditSubService
              onMouseLeave={() => setIsHoverSubService(false)}
              onMouseEnter={() => setIsHoverSubService(true)}
              subService={subService}
              title={title}
              key={i}
              order={order}
            />
          );
        })}
    </div>
  );
};

export default EditParameterService;
