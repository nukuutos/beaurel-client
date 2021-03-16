import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Service from '../../service';
import { deleteServiceSuccess } from '../../../../redux/service/actions/service';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';
import useAsyncAction from '../../../../hooks/useAsyncAction';

const EditServiceDisplay = ({ service, setIsEdit }) => {
  const [asyncAction, isLoading] = useAsyncAction();

  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id } = service;

  const deleteService = async (id) => {
    const config = {
      method: 'delete',
      url: `/profile/${profileId}/service/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceSuccess({ deletedService: { id } }));
      dispatch(setAlert(alert));
    }
  };

  return (
    <>
      <div className="service">
        <Service service={service} />
        {isLoading ? (
          <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
        ) : (
          <>
            <div onClick={() => setIsEdit(true)} className="service__btn service__btn service__btn--first btn--edit">
              <FontAwesomeIcon icon="pen" />
            </div>
            <div onClick={() => deleteService(id)} className="service__btn btn--edit btn--hover-fail">
              <FontAwesomeIcon icon="trash" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditServiceDisplay;
