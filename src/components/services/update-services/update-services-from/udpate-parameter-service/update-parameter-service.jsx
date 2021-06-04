import React, { useState } from 'react';
import UpdateSubService from './update-sub-service';
import UpdateTitle from './update-title';

const UpdateParameterService = ({ index: parentIndex, values, initialValues }) => {
  const [isShown, setIsShown] = useState(true);

  const { title, subServices } = values.services[parentIndex];

  return (
    // <div className={`${!isHoverSubService && isShown ? 'service-parameter--hover' : ''} service-parameter card mt-6`}>
    <div className={`service-parameter service-update mt-6`}>
      <UpdateTitle subServices={subServices} title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          const initialDuration = initialValues.services[parentIndex].subServices[i].duration;

          return (
            <UpdateSubService
              initialDuration={initialDuration}
              fieldName={`services.${parentIndex}.subServices.${i}.duration`}
              subService={subService}
              isLast={i === subServices.length - 1}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default UpdateParameterService;
