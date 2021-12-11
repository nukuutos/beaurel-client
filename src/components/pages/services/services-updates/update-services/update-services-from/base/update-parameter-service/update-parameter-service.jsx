import React, { useState } from 'react';
import UpdateSubService from './update-sub-service';
import UpdateTitle from './update-title';

const UpdateParameterService = ({ index: parentIndex, values, initialValues }) => {
  const [isShown, setIsShown] = useState(true);

  const { title, subServices } = values.services[parentIndex];

  return (
    <div className="service-parameter service-update card mt-6">
      <UpdateTitle title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          const initialDuration = initialValues.services[parentIndex].subServices[i].duration;
          const isLast = i === subServices.length - 1;

          return (
            <UpdateSubService
              initialDuration={initialDuration}
              fieldName={`services.${parentIndex}.subServices.${i}.duration`}
              subService={subService}
              isLast={isLast}
              key={subService.parameter}
            />
          );
        })}
    </div>
  );
};

export default UpdateParameterService;
