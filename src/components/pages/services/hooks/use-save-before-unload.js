import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import getIdsAndOrders from '../utils/get-ids-and-orders';
import areOrdersEqual from '../utils/are-orders-equal';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const useSaveBeforeUnload = () => {
  const [{ services, initialOrder }, { accessToken, id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
  ]);
  const [asyncAction] = useAsyncAction();

  const servicesRef = useRef();
  servicesRef.current = services;

  const onBeforeUnLoad = async () => {
    const newOrder = getIdsAndOrders(servicesRef.current);

    const config = {
      method: 'patch',
      url: `/master/${profileId}/service/order`,
      data: { newOrder },
      accessToken,
    };

    if (!areOrdersEqual(initialOrder, newOrder)) {
      await asyncAction(config);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnLoad);
    return () => {
      onBeforeUnLoad(); // case: navigate to another page
      window.removeEventListener('beforeunload', onBeforeUnLoad);
    };
  }, []);
};

export default useSaveBeforeUnload;
