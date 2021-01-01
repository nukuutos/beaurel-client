import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteServiceSuccess } from '../../../../../../redux/service/actions';
import { setAlert } from '../../../../../../redux/alert/actions';

import Spinner from '../../../../../utils/spinner';
import asyncCall from '../../../../../../utils/async-call';
import Service from '../service';

const EditServiceDisplay = ({ service, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false); // for api call
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const { id } = service;

  const deleteService = async (id) => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/${id}`,
      accessToken,
    };

    setIsLoading(true);

    const alert = await asyncCall(dispatch, config);

    if (alert) {
      dispatch(deleteServiceSuccess({ deletedService: { id }, serviceType: 'service' }));
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
      <div className="service mb-s-4">
        <Service service={service} />
      </div>
      {isLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s-4 mt-s-3" />
      ) : (
        <>
          <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage ml-s-4 mb-s-4">
            <FontAwesomeIcon icon="pen" />
          </div>
          <div onClick={() => deleteService(id)} className="service__icon service__icon--manage ml-s-4 mb-s-4">
            <FontAwesomeIcon icon="trash" />
          </div>
        </>
      )}
    </>
  );
};

export default EditServiceDisplay;
