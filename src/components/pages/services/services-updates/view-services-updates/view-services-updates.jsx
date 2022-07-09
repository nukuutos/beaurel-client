import React from 'react';
import dynamic from 'next/dynamic';
import useIsViewUpdateAlert from './utils/use-is-view-alert';
import UpdateDateAlert from './update-date-alert';
import ModalFallback from '../../../shared/modal-fallback';

const ServicesUpdates = dynamic(() => import('./view-services-update/updated-services'), {
  loading: () => <ModalFallback />,
});

const ViewServicesUpdate = ({ isUpdateServices, setIsUpdateServices }) => {
  const isViewUpdateAlert = useIsViewUpdateAlert();

  const openServicesUpdates = () => setIsUpdateServices((state) => ({ ...state, view: true }));
  const closeServicesUpdates = () => setIsUpdateServices((state) => ({ ...state, view: false }));

  return (
    <>
      {isViewUpdateAlert && <UpdateDateAlert openServicesUpdates={openServicesUpdates} />}
      {isUpdateServices.view && <ServicesUpdates close={closeServicesUpdates} />}
    </>
  );
};

export default ViewServicesUpdate;
