import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getIdsAndOrders from '../../utils/get-ids-and-orders';
import areOrdersEqual from '../../utils/are-orders-equal';
import asyncCall from '../../../../../../utils/async-call';
import { useRouter } from 'next/router';

const useSaveBeforeUnload = () => {
  const [{ services, initialOrder }, { accessToken, id: profileId }] = useSelector((state) => [
    state.services,
    state.auth,
  ]); // add public view
  const dispatch = useDispatch();
  const router = useRouter();

  const onBeforeUnLoad = async () => {
    const newOrder = getIdsAndOrders(services);

    const config = {
      method: 'patch',
      url: `/profile/${profileId}/service/order`,
      data: { newOrder },
      accessToken,
    };

    console.log(areOrdersEqual(initialOrder, newOrder));

    if (!areOrdersEqual(initialOrder, newOrder)) {
      await asyncCall(dispatch, config);
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', onBeforeUnLoad);
    // for navigation from services to another pages
    router.events.on('routeChangeStart', onBeforeUnLoad);

    return () => {
      window.removeEventListener('beforeunload', onBeforeUnLoad);
      router.events.off('routeChangeStart', onBeforeUnLoad);
    };
  });
};

export default useSaveBeforeUnload;
