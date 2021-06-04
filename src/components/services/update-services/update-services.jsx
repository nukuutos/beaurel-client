import React from 'react';
import { useSelector } from 'react-redux';
import UpdateAlert from './update-services-alert';
import Modal from '../../utils/modal';
import UpdateServicesFromServices from './update-services-from/update-services-from-services';
import getIsUpdateAlert from './utils/get-is-update-alert';

const UpdateServices = ({ isUpdateServices, setIsUpdateServices }) => {
  const { services } = useSelector((state) => state.services);

  return (
    <>
      {getIsUpdateAlert(services) && <UpdateAlert setIsUpdateServices={setIsUpdateServices} />}

      {isUpdateServices.update && (
        <Modal onClickClose={() => setIsUpdateServices((state) => ({ ...state, update: false }))}>
          <UpdateServicesFromServices close={() => setIsUpdateServices((state) => ({ ...state, update: false }))} />
        </Modal>
      )}
    </>
  );
};

export default UpdateServices;
