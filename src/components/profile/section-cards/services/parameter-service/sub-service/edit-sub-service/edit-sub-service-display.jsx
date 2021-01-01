import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteServiceSuccess } from '../../../../../../../redux/service/actions';
import asyncCall from '../../../../../../../utils/async-call';
import { setAlert } from '../../../../../../../redux/alert/actions';
import Spinner from '../../../../../../utils/spinner';
import SubService from '../sub-service';

const EditSubServiceDisplay = ({ subService, isLastService, setIsEdit, title }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [{ accessToken }, { isPublicView, id: profileId }] = useSelector((state) => [state.auth, state.profile]);

  const isCancelled = useRef(false);
  const dispatch = useDispatch();
  const { id } = subService;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/parameter/${title}/sub-service/${id}`,
      accessToken,
    };

    setIsLoading(true);

    const alert = await asyncCall(dispatch, config);

    if (alert) {
      console.log(id, title);
      dispatch(deleteServiceSuccess({ deletedService: { id, title }, serviceType: 'sub-service' }));
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
      <div className={`service ${isLastService ? 'mb-s-4' : ''}`}>
        <SubService subService={subService} isLastServic={isLastService} />
      </div>

      {IsLoading ? (
        <Spinner className={`spinner--tiny spinner--gc ml-s-4 ${isLastService ? 'mb-s-4' : ''}`} />
      ) : (
        <>
          {!isPublicView && (
            <>
              <div
                onClick={() => setIsEdit(true)}
                className={`service__icon service__icon--manage ml-s-4 ${isLastService ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="pen" />
              </div>
              <div
                onClick={() => deleteService(id)}
                className={`service__icon service__icon--manage ml-s-4 ${isLastService ? 'mb-s-4' : ''}`}>
                <FontAwesomeIcon icon="trash" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default EditSubServiceDisplay;
