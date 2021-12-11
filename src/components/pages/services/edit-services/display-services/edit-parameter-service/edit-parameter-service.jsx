import React, { useState } from 'react';
import EditSubService from './edit-sub-service/edit-sub-service';
import EditTitle from './edit-title/edit-title';
import getServiceParameterClassName from './utils/get-service-parameter-class-name';

const EditParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const { title, subServices, order } = service;

  const handleMouseLeave = () => setIsHoverSubService(false);
  const handleMouseEnter = () => setIsHoverSubService(true);

  const className = getServiceParameterClassName(isShown, isHoverSubService);

  const events = { handleMouseLeave, handleMouseEnter };

  return (
    <div className={`${className} card mt-6`}>
      <EditTitle service={service} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService) => (
          <EditSubService
            events={events}
            serviceProps={{ order, title }}
            subService={subService}
            key={subService.parameter}
          />
        ))}
    </div>
  );
};

export default EditParameterService;
