import React from 'react';
import NeedUpdateAlert from './need-update-alert';
import Modal from '../../../../base/modal/modal';
import UpdateServicesFromServices from './update-services-from/update-services-from-services';
import useIsNeedUpdateAlert from './utils/use-is-need-update-alert';

const UpdateServices = ({ isUpdateServices, setIsUpdateServices }) => {
  const isUpdateAlert = useIsNeedUpdateAlert();

  const closeUpdateServices = () => setIsUpdateServices((state) => ({ ...state, update: false }));
  const openUpdateServices = () => setIsUpdateServices((state) => ({ ...state, update: true }));

  return (
    <>
      {isUpdateAlert && <NeedUpdateAlert openUpdateServices={openUpdateServices} />}

      {isUpdateServices.update && (
        <Modal onClickClose={closeUpdateServices}>
          <UpdateServicesFromServices close={closeUpdateServices} />
        </Modal>
      )}
    </>
  );
};

export default UpdateServices;
