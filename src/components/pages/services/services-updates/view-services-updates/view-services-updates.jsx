import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import useIsViewUpdateAlert from './utils/use-is-view-alert';
import UpdateDateAlert from './update-date-alert';
import ModalFallback from '../../../shared/modal-fallback';

const ServicesUpdates = dynamic(() => import('./view-services-update/updated-services'), {
  loading: () => <ModalFallback />,
});

const ViewServicesUpdate = () => {
  const [isView, setIsView] = useState(false);
  const isViewUpdateAlert = useIsViewUpdateAlert();

  const openUpdateView = () => setIsView(true);
  const closeUpdateView = () => setIsView(false);

  return (
    <>
      {isViewUpdateAlert && <UpdateDateAlert openServicesUpdates={openUpdateView} />}
      {isView && <ServicesUpdates close={closeUpdateView} />}
    </>
  );
};

export default ViewServicesUpdate;
