import { useState } from 'react';
import UpdateServices from './update-services/update-services';
import ViewServicesUpdate from './view-services-updates/view-services-updates';

const ServicesUpdates = () => {
  const [isUpdateServices, setIsUpdateServices] = useState({
    view: false,
    update: false,
  });

  const IsUpdateServicesState = { isUpdateServices, setIsUpdateServices };

  return (
    <>
      <UpdateServices {...IsUpdateServicesState} />
      <ViewServicesUpdate {...IsUpdateServicesState} />
    </>
  );
};

export default ServicesUpdates;
