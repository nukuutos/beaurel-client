import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import asyncCall from '../../../../../utils/async-call';
import { deleteServiceParameterSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Title from '../../../parameter-service/title';
import Spinner from '../../../../utils/spinner';

// import asyncCall from '../../../../../../../../utils/async-call';
// import { setAlert } from '../../../../../../../../redux/alert/actions';
// import Spinner from '../../../../../../../utils/spinner';
// import Title from '../../../../parameter-service/title';
// import { deleteServiceParameterSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

const EditTitleDisplay = ({ title, setIsEdit, shownState }) => {
  const [isLoading, setIsLoading] = useState(false);
  const isCancelled = useRef(false);

  const [{ accessToken }, { isPublicView, id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const [isShown, setIsShown] = shownState;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/parameter/${title}`,
      accessToken,
    };

    setIsLoading(true);

    const alert = await asyncCall(dispatch, config);

    if (alert) {
      dispatch(deleteServiceParameterSuccess({ deletedServiceParameter: { title } }));
      dispatch(setAlert(alert));
    }

    if (!isCancelled.current) setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
    };
  }, []);

  const classNameService = `service service-parameter${isShown ? '--expand' : ''} ${!isShown ? 'mb-s-4' : ''}`;

  return (
    <div onClick={() => setIsShown(!isShown)} className={classNameService}>
      <Title shownState={shownState} title={title} />

      {isLoading ? (
        <Spinner className="spinner--tiny spinner--gc ml-s-4" />
      ) : (
        <>
          {!isPublicView && (
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
              <div onClick={() => deleteService(id)} className="service__btn btn--edit btn--hover-fail">
                <FontAwesomeIcon icon="trash" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EditTitleDisplay;
