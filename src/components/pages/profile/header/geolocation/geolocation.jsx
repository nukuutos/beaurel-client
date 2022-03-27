import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import EditPlaceOfWork from './edit-place-of-work/edit-place-of-work';
import displayPlaceOfWork from '../../../utils/display-place-of-work';

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
      <FontAwesomeIcon className="profile__map-marker" icon="map-marker-alt" />

      {isEdit && (isMaster ? <EditPlaceOfWork onClickClose={closeEditModal} /> : null)}

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
