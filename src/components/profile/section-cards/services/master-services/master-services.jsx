import { useState, useEffect } from 'react';

import AddService from './add-service/add-service';
import Modal from '../../../../utils/modal';
import EditServicesWrapper from './drag-and-edit-services';
import asyncCall from '../../../../../utils/async-call';
import areOrdersEqual from '../utils/are-orders-equal';
import getIdsAndOrders from '../utils/get-ids-and-orders';
import { useSelector, useDispatch } from 'react-redux';
import useSaveBeforeUnload from './hooks/use-save-before-unload';
import { setInitialOrder, getServicesStart } from '../../../../../redux/service/actions';

const MasterServices = ({ onClickClose }) => {
  const [isAddService, setIsAddService] = useState(false);
  const [{ services, initialOrder }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
    state.profile,
  ]); // add public view
  const dispatch = useDispatch();

  useSaveBeforeUnload();

  useEffect(() => {
    if (!services.length) dispatch(getServicesStart());
  }, []);

  const handleOnClick = () => {
    const newOrder = getIdsAndOrders(services);

    if (!areOrdersEqual(initialOrder, newOrder)) {
      // spec
      dispatch(setInitialOrder(newOrder));
      const config = {
        method: 'patch',
        url: `/profile/${profileId}/service/order`,
        data: { newOrder },
        accessToken,
      };

      asyncCall(dispatch, config);
    }

    onClickClose();
  };
  // ispublicview master services view
  // user services view
  return (
    <Modal onClickClose={handleOnClick}>
      {isAddService ? (
        <AddService setIsAddService={setIsAddService} />
      ) : (
        <EditServicesWrapper setIsAddService={setIsAddService} />
      )}
    </Modal>
  );
};

export default MasterServices;
