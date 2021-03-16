import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceParameterSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Title from '../../../parameter-service/title';
import Spinner from '../../../../utils/spinner';
import useAsyncAction from '../../../../../hooks/useAsyncAction';

const EditTitleDisplay = ({ title, setIsEdit, shownState }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const [isShown, setIsShown] = shownState;

  const deleteService = async (title) => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/parameter/${title}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceParameterSuccess({ deletedServiceParameter: { title } }));
      dispatch(setAlert(alert));
    }
  };

  const classNameService = `service service-parameter${isShown ? '--expand' : ''} ${!isShown ? 'mb-s-4' : ''}`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      <Title shownState={shownState} title={title} />

      {isLoading ? (
        <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
      ) : (
        <>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsShown(false);
              setIsEdit(true);
            }}
            className="service__btn service__btn--first btn--edit">
            <FontAwesomeIcon icon="pen" />
          </div>
          <div onClick={() => deleteService(title)} className="service__btn btn--edit btn--hover-fail">
            <FontAwesomeIcon icon="trash" />
          </div>
        </>
      )}
    </div>
  );
};

export default EditTitleDisplay;
