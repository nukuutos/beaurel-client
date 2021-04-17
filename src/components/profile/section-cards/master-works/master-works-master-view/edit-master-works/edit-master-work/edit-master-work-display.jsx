import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteWorkSuccess } from '../../../../../../../redux/work/actions';
import { setAlert } from '../../../../../../../redux/alert/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';

const EditMasterWorkDisplay = ({ work, setIsEdit, setActiveLink, isActiveLink, isLastLink, i }) => {
  const [{ accessToken }, { id: profileId }] = useSelector((state) => [state.auth, state.profile]);
  const dispatch = useDispatch();

  const [asyncAction, isLoading] = useAsyncAction();

  const deleteWork = async (event, id) => {
    event.stopPropagation();

    const config = {
      method: 'delete',
      url: `/profile/${profileId}/work/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);
    // console.log(alert);
    if (alert && isLastLink) {
      setActiveLink(i === 0 ? 0 : i - 1);
    }

    if (alert) {
      dispatch(deleteWorkSuccess({ deletedId: id }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <li
      onClick={() => setActiveLink(i)}
      className={`master-works__item ${isActiveLink ? 'master-works__item--active' : ''}`}>
      {work.title}

      <div className="master-works__icons">
        <FontAwesomeIcon
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(true);
          }}
          className="master-works__icon mr-3 "
          icon="pen"
        />
        <FontAwesomeIcon
          onClick={(e) => deleteWork(e, work._id)}
          className="master-works__icon master-works__icon--trash"
          icon="trash"
        />
      </div>
    </li>
  );
};

export default EditMasterWorkDisplay;
