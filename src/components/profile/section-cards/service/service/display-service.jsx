import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteServiceSuccess } from '../../../../../redux/service/actions';
import { setAlert } from '../../../../../redux/alert/actions';

import Spinner from '../../../../utils/spinner';
import asyncCall from '../../../../../utils/async-call';
import { Draggable } from 'react-beautiful-dnd';

const DisplayService = ({ service, setIsEdit }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false); // for api call
  const [{ accessToken }, { isPublicView }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const { title, duration, price, id, order } = service;

  const deleteService = async (id) => {
    const config = {
      method: 'delete',
      url: `/profile/5eb849b81c2ccc21306ced34/service/${id}`,
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
      <Draggable draggableId={title} index={order}>
        {({ innerRef, draggableProps, dragHandleProps }, snapshot) => {
          return (
            <div
              ref={innerRef}
              {...draggableProps}
              {...dragHandleProps}
              className="service"
              onClick={() => console.log(1)}>
              <span className="service__title mt-s-3">{title}</span>
              <span className="service__duration">{duration}</span>
              <span className="service__price">{price}</span>
            </div>
          );
        }}
      </Draggable>

      {isLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s mt-s-3" />
      ) : (
        <>
          {!isPublicView && (
            <>
              <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage ml-m mt-s-3">
                <FontAwesomeIcon icon="pen" />
              </div>
              <div onClick={() => deleteService(id)} className="service__icon service__icon--manage ml-m mt-s-3">
                <FontAwesomeIcon icon="trash" />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default DisplayService;
