import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsPublicView } from '../../../redux/profile/actions';

const PublicView = () => {
  const { isPublicView } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  return isPublicView ? (
    <div className="public-view--out" onClick={() => dispatch(changeIsPublicView())}>
      <FontAwesomeIcon className="public-view__icon--out" icon={['far', 'eye-slash']} />
    </div>
  ) : (
    <div className="public-view" onClick={() => dispatch(changeIsPublicView())}>
      Public View
      <FontAwesomeIcon className="public-view__icon" icon={['far', 'eye']} />
    </div>
  );
};

export default PublicView;
