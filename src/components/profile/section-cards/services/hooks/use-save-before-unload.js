import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getIdsAndOrders from '../utils/get-ids-and-orders';
import areOrdersEqual from '../utils/are-orders-equal';
import asyncCall from '../../../../../utils/async-call';

const useSaveBeforeUnload = () => {
  const [{ services, initialOrder }, { accessToken }, { id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
    state.profile,
  ]); // add public view
  const dispatch = useDispatch();

  const onBeforeUnLoad = async () => {
    const newOrder = getIdsAndOrders(services);

    const config = {
      method: 'patch',
      url: `/profile/${profileId}/service/order`,
      data: { newOrder },
      accessToken,
    };

    if (!areOrdersEqual(initialOrder, newOrder)) {
      await asyncCall(dispatch, config);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnLoad);
    return () => window.removeEventListener('beforeunload', onBeforeUnLoad);
  }, []);
};

export default useSaveBeforeUnload;
