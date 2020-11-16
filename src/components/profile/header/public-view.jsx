import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PublicView = ({ isPublicView, setIsPublicView }) => {
  return isPublicView ? (
    <div className="public-view--out" onClick={() => setIsPublicView(!isPublicView)}>
      <FontAwesomeIcon className="public-view__icon--out" icon={['far', 'eye-slash']} />
    </div>
  ) : (
    <div className="public-view" onClick={() => setIsPublicView(!isPublicView)}>
      Public View
      <FontAwesomeIcon className="public-view__icon" icon={['far', 'eye']} />
    </div>
  );
};

export default PublicView;
