import React from 'react';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';
import { deleteWorkSuccess } from '../../../../../redux/work/actions';
import { setAlert } from '../../../../../redux/alert/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

const Sidenav = ({ state }) => {
  const [{ index }, setState] = state;

  const [asyncAction] = useAsyncAction();
  const [{ works }, { accessToken, id: profileId }] = useSelector((state) => [state.work, state.auth]);
  const dispatch = useDispatch();

  const deleteWork = async () => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/work/${works[index]._id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      // setState (index)
      dispatch(deleteWorkSuccess({ deletedId: works[index]._id }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <div className="carousel__sidenav">
      <div onClick={() => setState((state) => ({ ...state, display: 'edit' }))} className="btn-icon mr-2">
        <FontAwesomeIcon icon="pen" />
      </div>
      <div onClick={() => deleteWork()} className="btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  );
};

export default Sidenav;
