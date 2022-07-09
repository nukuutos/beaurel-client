import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import displayPlaceOfWork from '../../../utils/display-place-of-work';
import ModalFallback from '../../../shared/modal-fallback';
import Pen from '../../../../base/icons/pen';
import MapMarker from '../../../../base/icons/map-marker';

const EditGeolocation = dynamic(() => import('./edit-geolocation/edit-geolocation'), {
  loading: () => <ModalFallback />,
});

const Geolocation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [{ placeOfWork, isPublicView, role, city }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);

  const isMaster = role === 'master';

  const openEditModal = () => setIsEdit(true);
  const closeEditModal = () => setIsEdit(false);

  return (
    <div className="profile__geolocation">
      <MapMarker className="profile__map-marker" />

      {isEdit && <EditGeolocation closeEditModal={closeEditModal} />}

      {isMaster ? displayPlaceOfWork(placeOfWork) : city}

      {!isPublicView && (
        <Pen onClick={openEditModal} className={`profile__edit ${isPhone ? 'ml-3' : 'ml-4'}`} />
      )}
    </div>
  );
};
export default Geolocation;
