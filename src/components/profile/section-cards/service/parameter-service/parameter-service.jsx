import React, { useState } from 'react';
import SubService from './sub-service/sub-service';
import Title from './title/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ParameterService = ({ service }) => {
  const [isShown, setIsShown] = useState(false);

  const { title, subServices } = service;
  // add dragga here
  return (
    <>
      <Title title={title} shownState={[isShown, setIsShown]} />
      {isShown &&
        subServices.map((subService, i) => {
          return (
            <SubService subService={subService} isLastService={i === subService.length - 1} title={title} key={i} />
          );
        })}
      {/* overweight ui {isShown && (
        <div className={`service--add `} onClick={() => setIsAddService(true)}>
          <FontAwesomeIcon icon="plus" />
        </div>
      )} */}
    </>
  );
};

export default ParameterService;
