import React from 'react';
import { useSelector } from 'react-redux';
import EditCustomerCity from './edit-customer-city/edit-customer-city';
import EditMasterPlaceOfWork from './edit-master-place-of-work/edit-master-place-of-work';

const EditGeolocation = ({ closeEditModal }) => {
  const { role } = useSelector((state) => state.profile);

  const isMaster = role === 'master';

  return isMaster ? (
    <EditMasterPlaceOfWork onClickClose={closeEditModal} />
  ) : (
    <EditCustomerCity onClickClose={closeEditModal} />
  );
};

export default EditGeolocation;
