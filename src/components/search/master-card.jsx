import React from 'react';
import ProfileRating from '../profile/header/profile-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StarProfile from '../profile/header/star-profile';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { deleteMaster, addMaster } from '../../redux/profile/actions';
import useAsyncAction from '../../hooks/use-async-action/use-async-action';

const MasterCard = ({ master, className }) => {
  const [{ masters }, { accessToken, id: profileId }] = useSelector((state) => [state.profile, state.auth]);
  const { firstName, lastName, rating, placeOfwork, avatar, specialization, _id } = master;

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  const onClickAddMaster = async (e) => {
    e.stopPropagation();

    const config = {
      method: 'put',
      url: `/profile/${profileId}/master/${_id}`,
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
      url: `/profile/${profileId}/master/${_id}`,
      accessToken,
    };

    // for ui
    dispatch(deleteMaster({ deletedMasterId: _id }));
    await asyncAction(config);
  };

  return (
    <div className={`${className} master-card card`} onClick={() => router.push(`/${_id}`)}>
      <div className="master-card__identify">
        <img src={`http://localhost:5000/${avatar}`} alt="Profile image" className="master-card__avatar" />
        <ProfileRating className="mt-2" ratingScore={rating} />
      </div>
      <div className="master-card__biography">
        <h1 className="master-card__name mt-3">{firstName + ' ' + lastName[0] + '.'}</h1>
        <h2 className="master-card__specialization mt-3">{specialization}</h2>
        <div className="master-card__geoposition mt-3">
          <FontAwesomeIcon className="master-card__map-marker" icon="map-marker-alt" />
          {placeOfwork}
        </div>
      </div>
      <StarProfile
        onClick={
          isLoading ? (e) => e.stopPropagation() : masters.includes(_id) ? onClickDeleteMaster : onClickAddMaster
        }
        isStarred={masters.includes(_id)}
      />
    </div>
  );
};

export default MasterCard;
