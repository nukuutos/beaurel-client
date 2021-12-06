import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { setAlert } from '../../../../../../redux/alert/actions';
import { deleteWorkSuccess } from '../../../../../../redux/work/actions';

const PhoneSidenav = ({ state, setIsDeleting }) => {
  const [{ index }, setState] = state;

  const [asyncAction, isLoading, isCancelled] = useAsyncAction();
  const [{ works }, { accessToken, id: profileId }] = useSelector((state) => [
    state.work,
    state.auth,
  ]);
  const dispatch = useDispatch();

  const deleteWork = async () => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/work/${works[index]._id}`,
      accessToken,
    };

    setIsDeleting(true);

    const alert = await asyncAction(config);

    if (alert) {
      setState((state) => ({ ...state, display: 'works' }));
      dispatch(deleteWorkSuccess({ deletedId: works[index]._id }));
      dispatch(setAlert(alert));
    }

    if (!isCancelled.current) setIsDeleting(false);
  };

  return (
    <div className="carousel__mobile-buttons">
      <div
        onClick={() => setState((state) => ({ ...state, display: 'edit' }))}
        className="btn-icon mr-2"
      >
        <FontAwesomeIcon icon="pen" />
      </div>
      <div onClick={() => deleteWork()} className="btn-icon btn-icon--fail">
        <FontAwesomeIcon icon="trash" />
      </div>
    </div>
  );
};

export default PhoneSidenav;
