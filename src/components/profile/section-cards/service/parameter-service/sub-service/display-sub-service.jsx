import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteServiceStart, deleteServiceSuccess } from '../../../../../../redux/service/actions';
import asyncCall from '../../../../../../utils/async-call';
import { setAlert } from '../../../../../../redux/alert/actions';
import Spinner from '../../../../../utils/spinner';

const DisplaySubService = ({ subService, isLastService, setIsEdit, title }) => {
  const [IsLoading, setIsLoading] = useState(false);
  const [{ accessToken }, { isPublicView }] = useSelector((state) => [state.auth, state.profile]);

  const isCancelled = useRef(false);
  const dispatch = useDispatch();
  const { parameter, duration, price, id } = subService;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/5eb849b81c2ccc21306ced34/service/parameter/${title}/sub-service/${id}`,
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
      <div className="service">
        <span className={`service__parameter ${isLastService ? 'service__parameter--last' : ''}`}>{parameter}</span>
        <span className="service__duration">{duration}</span>
        <span className={`service__price service__price--parameter ${isLastService ? 'service__price--last' : ''}`}>
          {price}
        </span>
      </div>

      {IsLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s mt-s-3" />
      ) : (
        <>
          {!isPublicView && (
            <>
              <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage ml-m">
                <FontAwesomeIcon icon="pen" />
              </div>
              <div onClick={() => deleteService(id)} className="service__icon service__icon--manage ml-m">
                <FontAwesomeIcon icon="trash" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DisplaySubService;
