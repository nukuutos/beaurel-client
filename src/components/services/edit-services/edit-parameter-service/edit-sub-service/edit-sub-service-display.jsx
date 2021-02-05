import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import asyncCall from '../../../../../utils/async-call';
import { deleteSubServiceSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Spinner from '../../../../utils/spinner';
import SubService from '../../../parameter-service/sub-service';
// import asyncCall from '../../../../../../../../utils/async-call';
// import { setAlert } from '../../../../../../../../redux/alert/actions';
// import Spinner from '../../../../../../../utils/spinner';
// import SubService from '../../../../parameter-service/sub-service';
// import { deleteSubServiceSuccess } from '../../../../../../../../redux/service/actions/service-parameter';

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
      dispatch(deleteSubServiceSuccess({ deletedSubService: { id, title } }));
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
      <div className={`service service-parameter`}>
        <SubService subService={subService} isLastServic={isLastService} />
        {IsLoading ? (
          <Spinner className={`spinner--tiny spinner--gc ml-s-4 ${isLastService ? 'mb-s-4' : ''}`} />
        ) : (
          <>
            {!isPublicView && (
              <>
                <div onClick={() => setIsEdit(true)} className="service__btn service__btn--first btn--edit">
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
    </>
  );
};

export default EditSubServiceDisplay;
