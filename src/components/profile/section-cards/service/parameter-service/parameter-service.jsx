import React, { useState } from 'react';
import SubService from './sub-service/sub-service';
import Title from './title/title';

const ParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);

  const { title, subServices } = service;

  return (
    <>
      <Title title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <SubService subService={subService} isLastService={i === subService.length - 1} title={title} key={i} />
          );
        })}
    </>
  );
};

export default ParameterService;
