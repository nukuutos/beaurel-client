import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { deleteWorkSuccess } from '../../../../../../redux/work/actions';
import { setAlert } from '../../../../../../redux/alert/actions';

const Sidenav = ({ state, setIsDeleting }) => {
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

    const alert = await asyncAction(config);

    setIsDeleting(true);

    console.log('hi');
    console.log('hi');
    console.log('hi');

    if (alert) {
      setState((state) => ({ ...state, display: 'works' }));
      dispatch(deleteWorkSuccess({ deletedId: works[index]._id }));
      dispatch(setAlert(alert));
    }

    if (!isCancelled.current) setIsDeleting(false);
  };

  return (
    <div className="carousel__sidenav">
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

export default Sidenav;
