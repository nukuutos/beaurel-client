import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteSubServiceSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Spinner from '../../../../utils/spinner';
import SubService from '../../../parameter-service/sub-service';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';

const EditSubServiceDisplay = ({ subService, isLastService, setIsEdit, title }) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const { accessToken, id: profileId } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { id } = subService;

  const deleteService = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/parameter/${title}/sub-service/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteSubServiceSuccess({ id, title }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <>
      <div className={`service service-parameter`}>
        <SubService subService={subService} isLastServic={isLastService} />
        {isLoading ? (
          <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
        ) : (
          <>
            <div onClick={() => setIsEdit(true)} className="service__btn service__btn--first btn-icon">
              <FontAwesomeIcon icon="pen" />
            </div>
            <div onClick={() => deleteService(id)} className="service__btn btn-icon btn-icon--fail">
              <FontAwesomeIcon icon="trash" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditSubServiceDisplay;
