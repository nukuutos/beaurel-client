import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import ModalFallback from '../../../shared/modal-fallback';
import NeedUpdateAlert from './need-update-alert';
import useIsNeedUpdateAlert from './utils/use-is-need-update-alert';

const UpdateServicesFromServices = dynamic(
  () => import('./update-services-from/update-services-from-services'),
  {
    loading: () => <ModalFallback />,
  }
);

const UpdateServices = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const isUpdateAlert = useIsNeedUpdateAlert();

  const openServicesUpdate = () => setIsUpdate(true);
  const closeServicesUpdate = () => setIsUpdate(false);

  return (
    <>
      {isUpdateAlert && <NeedUpdateAlert openUpdateServices={openServicesUpdate} />}
      {isUpdate && <UpdateServicesFromServices close={closeServicesUpdate} />}
    </>
  );
};

export default UpdateServices;
