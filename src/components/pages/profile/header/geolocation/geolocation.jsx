import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import displayPlaceOfWork from '../../../utils/display-place-of-work';
import EditGeolocation from './edit-geolocation/edit-geolocation';

const Geolocation = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [{ placeOfWork, isPublicView, role, city }, { isPhone }] = useSelector((state) => [
    state.profile,
    state.screenSize,
  ]);

  const isMaster = role === 'master';

  const openEditModal = () => setIsEdit(true);

  return (
    <div className="profile__geolocation">
      <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />

      {isEdit && <EditGeolocation />}

      {isMaster ? displayPlaceOfWork(placeOfWork) : city}

      {!isPublicView && (
        <FontAwesomeIcon
          onClick={openEditModal}
          className={`profile__edit ${isPhone ? 'ml-3' : 'ml-4'}`}
          icon="pen"
        />
      )}
    </div>
  );
};
export default Geolocation;
