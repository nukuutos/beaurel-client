import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Service from '../../service';
import { deleteServiceSuccess } from '../../../../redux/service/actions/service';
import { setAlert } from '../../../../redux/alert/actions';
import Spinner from '../../../utils/spinner';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import useMediaQuery from '../../../../hooks/use-media-query';

const DesktopButtons = ({ setIsEdit, deleteService }) => (
  <>
    <div onClick={() => setIsEdit(true)} className="service__btn  service__btn--first btn-icon">
      <FontAwesomeIcon icon="pen" />
    </div>
    <div onClick={deleteService} className="service__btn btn-icon btn-icon--fail">
      <FontAwesomeIcon icon="trash" />
    </div>
  </>
);

const TabletButtons = ({ setIsEdit, deleteService }) => (
  <div className="service__mobile-buttons">
    <div onClick={deleteService} className="service__btn">
      Удалить
      <FontAwesomeIcon icon="trash" />
    </div>
    <div onClick={() => setIsEdit(true)} className="service__btn">
      Изменить
      <FontAwesomeIcon icon="pen" />
    </div>
  </div>
);

const EditServiceDisplay = ({ service, setIsEdit }) => {
  const [asyncAction, isLoading] = useAsyncAction();
  const isTablet = useMediaQuery(900);
  const { accessToken, id: profileId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id, order } = service;

  const deleteService = async (id) => {
    const config = {
      method: 'delete',
      url: `/master/${profileId}/service/${id}`,
      accessToken,
    };

    const alert = await asyncAction(config);

    if (alert) {
      dispatch(deleteServiceSuccess({ serviceId: id, order }));
      dispatch(setAlert(alert));
    }
  };

  const renderButtons = (isTablet, setIsEdit, deleteService) =>
    isTablet ? (
      <TabletButtons setIsEdit={setIsEdit} deleteService={() => deleteService(id)} />
    ) : (
      <DesktopButtons setIsEdit={setIsEdit} deleteService={() => deleteService(id)} />
    );

  const renderLoading = (isTablet) =>
    isTablet ? (
      <div className="spinner-with-background" />
    ) : (
      <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
    );

  return (
    <div className="service service--hover service--edit-mobile card mt-6">
      <Service service={service} />
      {isTablet && isLoading && <div className="spinner-with-background" />}
      {!isTablet && isLoading && (
        <Spinner className="service__btn service__btn--first spinner--absolute spinner--tiny" />
      )}
      {!isLoading && renderButtons(isTablet, setIsEdit, deleteService)}
    </div>
  );
};

export default EditServiceDisplay;
