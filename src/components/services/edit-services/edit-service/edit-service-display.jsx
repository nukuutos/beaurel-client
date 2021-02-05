import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Service from '../../service';
import asyncCall from '../../../../utils/async-call';
import { deleteServiceSuccess } from '../../../../redux/service/actions/service';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';

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
      dispatch(deleteServiceSuccess({ deletedService: { id } }));
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
      <div className="service">
        <Service service={service} />
        {isLoading ? (
          <Spinner className="spinner--tiny spinner--gc" />
        ) : (
          <>
            <div onClick={() => setIsEdit(true)} className="service__btn service__btn service__btn--first btn--edit">
              <FontAwesomeIcon icon="pen" />
            </div>
            <div onClick={() => deleteService(id)} className="service__btn btn--edit btn--hover-fail">
              <FontAwesomeIcon icon="trash" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditServiceDisplay;
