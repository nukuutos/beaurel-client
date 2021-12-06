import React, { useState } from 'react';
import ViewSubService from './view-sub-service';
import ViewTitle from './view-title';

const ViewParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  const [isHoverSubService, setIsHoverSubService] = useState(false);

  const { title, subServices } = service;
  return (
    <div className={`${!isHoverSubService && isShown ? 'service-parameter--hover' : ''} service-parameter card mt-6`}>
      <ViewTitle title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <ViewSubService
              onMouseLeave={() => setIsHoverSubService(false)}
              onMouseEnter={() => setIsHoverSubService(true)}
              subService={subService}
              title={title}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default ViewParameterService;
