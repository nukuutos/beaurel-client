import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceSuccess } from '../../../../../../../redux/service/actions';
import asyncCall from '../../../../../../../utils/async-call';
import { setAlert } from '../../../../../../../redux/alert/actions';
import Spinner from '../../../../../../utils/spinner';
import Title from '../title';

const EditTitleDisplay = ({ title, setIsEdit, shownState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false);

  const [{ accessToken }, { isPublicView, id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const [isShown] = shownState;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/parameter/${title}`,
      accessToken,
    };

    setIsLoading(true);

    const alert = await asyncCall(dispatch, config);

    if (alert) {
      dispatch(deleteServiceSuccess({ deletedService: { title }, serviceType: 'parameter' }));
      dispatch(setAlert(alert));
    }

    if (!isCancelled.current) setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  return (
    <>
      <Title shownState={shownState} title={title} />

      {isLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s-4" />
      ) : (
        <>
          {!isPublicView && (
            <>
              <div
                onClick={() => setIsEdit(true)}
                className={`service__icon service__icon--manage ml-s-4 ${!isShown ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="pen" />
              </div>
              <div
                onClick={() => deleteService()}
                className={`service__icon service__icon--manage ml-s-4 ${!isShown ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="trash" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EditTitleDisplay;
