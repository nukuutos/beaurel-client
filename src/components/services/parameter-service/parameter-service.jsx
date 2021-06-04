import React, { useState } from 'react';
import Title from './title';
import SubService from './sub-service';

const ParameterService = ({ service, onClick = null }) => {
  const [isShown, setIsShown] = useState(false);
  const { title, subServices } = service;

  return (
    <>
      <Title shownState={[isShown, setIsShown]} title={title} />

      {isShown &&
        subServices.map((subService, i) => {
          return (
            <div onClick={onClick} className={`service `} key={i}>
              <SubService subService={subService} />
            </div>
          );
        })}
    </>
  );
};

export default ParameterService;
