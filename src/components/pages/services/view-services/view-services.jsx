import React from 'react';
import { useSelector } from 'react-redux';
import getIsViewAlert from './utils/get-is-view-alert';
import ViewAlert from './view-alert';
import ViewServicesUpdate from './view-services-update/view-services-update';
import Modal from '../../../base/modal';

const ViewServices = ({ isUpdateServices, setIsUpdateServices }) => {
  const { services } = useSelector((state) => state.services);

  return (
    <>
      {getIsViewAlert(services) && <ViewAlert setIsUpdateServices={setIsUpdateServices} />}
      {isUpdateServices.view && (
        <Modal onClickClose={() => setIsUpdateServices((state) => ({ ...state, view: false }))}>
          <ViewServicesUpdate
            close={() => setIsUpdateServices((state) => ({ ...state, view: false }))}
          />
        </Modal>
      )}
    </>
  );
};

export default ViewServices;
