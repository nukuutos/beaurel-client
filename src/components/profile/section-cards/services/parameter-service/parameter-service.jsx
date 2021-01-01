import React, { useState } from 'react';
import Title from './title';
import SubService from './sub-service/sub-service';

const ParameterService = ({ service, onClick = null }) => {
  const [isShown, setIsShown] = useState(false);
  const { title, subServices } = service;

  return (
    <>
      <Title shownState={[isShown, setIsShown]} title={title} />

      {isShown &&
        subServices.map((subService, i) => {
          const isLastService = i === subServices.length - 1;

          return (
            <div onClick={onClick} className={`service ${isLastService ? 'mb-s-4' : ''}`} key={i}>
              <SubService subService={subService} isLastService={isLastService} />
            </div>
          );
        })}
    </>
  );
};

export default ParameterService;
