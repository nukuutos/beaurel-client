import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceStart, deleteServiceSuccess } from '../../../../../../redux/service/actions';
import asyncCall from '../../../../../../utils/async-call';
import { setAlert } from '../../../../../../redux/alert/actions';
import Spinner from '../../../../../utils/spinner';

const DisplayTitle = ({ title, setIsEdit, shownState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.auth);

  const isCancelled = useRef(false);

  const [isShown, setIsShown] = shownState;
  const dispatch = useDispatch();

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/5eb849b81c2ccc21306ced34/service/${title}`,
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
      <div className="service">
        <span
          onClick={() => setIsShown(!isShown)}
          className={`service__title service__title--parameter mt-s ${!isShown ? 'service__title--hidden' : ''}`}>
          <div className={`service__icon service__icon--reveal ${isShown ? 'service__icon--reveal-rotated' : ''} mr-s`}>
            <FontAwesomeIcon className={` `} icon="caret-right" />
          </div>
          {title}
        </span>
      </div>

      {isLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s mt-s" />
      ) : (
        <>
          <div onClick={() => setIsEdit(true)} className="service__icon service__icon--manage ml-m mt-s">
            <FontAwesomeIcon className="service__manage-icon " icon="pen" />
          </div>
          <div onClick={() => deleteService()} className="service__icon service__icon--manage ml-m mt-s">
            <FontAwesomeIcon className="service__manage-icon" icon="trash" />
          </div>
        </>
      )}
    </>
  );
};

export default DisplayTitle;
