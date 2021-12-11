import React from 'react';
import useIsViewUpdateAlert from './utils/use-is-view-alert';
import UpdateDateAlert from './update-date-alert';
import ServicesUpdates from './view-services-update/updated-services';
import Modal from '../../../../base/modal';

const ViewServicesUpdate = ({ isUpdateServices, setIsUpdateServices }) => {
  const isViewUpdateAlert = useIsViewUpdateAlert();

  const openServicesUpdates = () => setIsUpdateServices((state) => ({ ...state, view: true }));
  const closeServicesUpdates = () => setIsUpdateServices((state) => ({ ...state, view: false }));

  return (
    <>
      {isViewUpdateAlert && <UpdateDateAlert openServicesUpdates={openServicesUpdates} />}
      {isUpdateServices.view && (
        <Modal onClickClose={closeServicesUpdates}>
          <ServicesUpdates close={closeServicesUpdates} />
        </Modal>
      )}
    </>
  );
};

export default ViewServicesUpdate;
