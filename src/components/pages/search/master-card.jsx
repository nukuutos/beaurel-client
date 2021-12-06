import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import StarProfile from '../profile/header/star-profile';
import { deleteMaster, addMaster } from '../../../redux/profile/actions';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';
import MasterCardRating from './master-card-rating';
import getAvatarPath from '../utils/get-avatar-path';

const MasterCard = ({ master, className, masterCardRef = null }) => {
  const [{ masters }, { accessToken, id: profileId }] = useSelector((state) => [
    state.profile,
    state.auth,
  ]);

  const { firstName, lastName, rating, placeOfWork, avatar, specialization, _id } = master;

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickAddMaster = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'post',
      url: `/profile/${profileId}/favorite/${_id}`,
      accessToken,
    };

    // for ui
    dispatch(addMaster({ newMasterId: _id }));
    await asyncAction(config);
  };

  const onClickDeleteMaster = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'delete',
      url: `/profile/${profileId}/favorite/${_id}`,
      accessToken,
    };

    // for ui
    dispatch(deleteMaster({ deletedMasterId: _id }));
    await asyncAction(config);
  };

  return (
    <div
      ref={masterCardRef}
      className={`${className} master-card card`}
      onClick={() => router.push(`/${_id}`)}
    >
      <div className="master-card__identify">
        <img src={getAvatarPath(avatar)} alt="Profile avatar" className="master-card__avatar" />
        {rating && <MasterCardRating className="master-card__rating" ratingScore={rating} />}
        {!rating && (
          <MasterCardRating
            className="master-card__rating master-card__rating--empty"
            ratingScore={5}
          />
        )}
      </div>
      <div className="master-card__biography">
        <h1 className="master-card__name">{`${firstName} ${lastName}`}</h1>
        <h2 className="master-card__specialization">{specialization}</h2>
        <div className="master-card__geolocation mt-3">
          <FontAwesomeIcon className="master-card__map-marker" icon="map-marker-alt" />
          {placeOfWork}
        </div>
      </div>
      {profileId && profileId !== _id && (
        <StarProfile
          onClick={
            isLoading
              ? (e) => e.stopPropagation()
              : masters.includes(_id)
              ? onClickDeleteMaster
              : onClickAddMaster
          }
          isStarred={masters.includes(_id)}
        />
      )}
    </div>
  );
};

export default MasterCard;
