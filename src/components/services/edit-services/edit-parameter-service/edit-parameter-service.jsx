import React, { useState } from 'react';
import EditSubService from './edit-sub-service/edit-sub-service';
import EditTitle from './edit-title/edit-title';

const EditParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);

  const { title, subServices } = service;
  return (
    <>
      <EditTitle title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <EditSubService
              subService={subService}
              isLastService={i === subServices.length - 1}
              title={title}
              key={i}
            />
          );
        })}
    </>
  );
};

export default EditParameterService;
