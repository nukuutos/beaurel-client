import React from 'react';

import SubService from '../../../parameter-service/sub-service';

const ViewSubService = ({ onMouseEnter, onMouseLeave, subService }) => {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`service service--hover service-parameter__sub-service`}>
      <SubService subService={subService} />
    </div>
  );
};

export default ViewSubService;
