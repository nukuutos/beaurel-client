import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { deleteServiceParameterSuccess } from '../../../../../redux/service/actions/service-parameter';
import { setAlert } from '../../../../../redux/alert/actions';
import Title from '../../../parameter-service/title';
import Spinner from '../../../../utils/spinner';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';

const EditTitleDisplay = ({ title, setIsEdit, shownState }) => {
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const [isShown, setIsShown] = shownState;

  const deleteService = async (title) => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/service-parameter/${title}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceParameterSuccess({ title }));
      dispatch(setAlert(alert));
    }
  };

  const classNameService = `service service-parameter${isShown ? '--expand' : ''} ${!isShown ? 'service--hover' : ''}`;

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
            className="service__btn service__btn--first btn-icon">
            <FontAwesomeIcon icon="pen" />
          </div>
          <div onClick={() => deleteService(title)} className="service__btn btn-icon btn-icon--fail">
            <FontAwesomeIcon icon="trash" />
          </div>
        </>
      )}
    </div>
  );
};

export default EditTitleDisplay;
