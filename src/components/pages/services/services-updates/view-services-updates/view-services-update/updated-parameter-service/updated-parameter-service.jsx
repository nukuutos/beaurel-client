import React, { useState } from 'react';
import getHoverServiceParameterClassName from '../../../../utils/get-hover-service-parameter-class-name';
import useIsHover from '../../../../hooks/use-is-hover';
import UpdatedSubService from './updated-sub-service';
import UpdatedTitle from './updated-title';

const UpdatedParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);
  const [isSubServiceHover, events] = useIsHover();

  const { title, subServices } = service;

  const hoverClass = getHoverServiceParameterClassName({ isShown, isSubServiceHover });

  return (
    <div className={`${hoverClass} service-parameter card mt-6`}>
      <UpdatedTitle title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService) => (
          <UpdatedSubService
            {...events}
            subService={subService}
            title={title}
            key={subService.parameter}
          />
        ))}
    </div>
  );
};

export default UpdatedParameterService;
