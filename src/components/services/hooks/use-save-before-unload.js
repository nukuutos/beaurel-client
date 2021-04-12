import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import getIdsAndOrders from '../utils/get-ids-and-orders';
import areOrdersEqual from '../utils/are-orders-equal';
import useAsyncAction from '../../../hooks/useAsyncAction';

const useSaveBeforeUnload = () => {
  const [{ services, initialOrder }, { accessToken, id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
  ]);
  const [asyncAction] = useAsyncAction();

  const onBeforeUnLoad = async () => {
    const newOrder = getIdsAndOrders(services);

    const config = {
      method: 'patch',
      url: `/profile/${profileId}/service/order`,
      data: { newOrder },
      accessToken,
    };

    if (!areOrdersEqual(initialOrder, newOrder)) {
      await asyncAction(config);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnLoad);
    return () => window.removeEventListener('beforeunload', onBeforeUnLoad);
  }, []);
};

export default useSaveBeforeUnload;
