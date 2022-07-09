import dynamic from 'next/dynamic';
import React from 'react';
import ModalFallback from '../../../shared/modal-fallback';
import NeedUpdateAlert from './need-update-alert';
import useIsNeedUpdateAlert from './utils/use-is-need-update-alert';

const UpdateServicesFromServices = dynamic(
  () => import('./update-services-from/update-services-from-services'),
  {
    loading: () => <ModalFallback />,
  }
);

const UpdateServices = ({ isUpdateServices, setIsUpdateServices }) => {
  const isUpdateAlert = useIsNeedUpdateAlert();

  const closeUpdateServices = () => setIsUpdateServices((state) => ({ ...state, update: false }));
  const openUpdateServices = () => setIsUpdateServices((state) => ({ ...state, update: true }));

  return (
    <>
      {isUpdateAlert && <NeedUpdateAlert openUpdateServices={openUpdateServices} />}
      {isUpdateServices.update && <UpdateServicesFromServices close={closeUpdateServices} />}
    </>
  );
};

export default UpdateServices;
