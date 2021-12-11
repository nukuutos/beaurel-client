import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';

const useGetUnsuitableServices = () => {
  const { id: masterId, accessToken } = useSelector((state) => state.auth);
  const [unsuitableServices, setUnsuitableServices] = useState([]);
  const [asyncAction, isLoading, isCancelled] = useAsyncAction();

  const getUnsuitableServices = useCallback(async () => {
    const config = {
      method: 'get',
      url: `/master/${masterId}/service/update`,
      accessToken,
    };

    const data = await asyncAction(config);

    if (data && !isCancelled.current) setUnsuitableServices(data.unsuitableServices);
  }, [accessToken, asyncAction, isCancelled, masterId]);

  useEffect(() => {
    if (!unsuitableServices.length) getUnsuitableServices();
  }, [getUnsuitableServices, unsuitableServices.length]);

  return [unsuitableServices, isLoading];
};

export default useGetUnsuitableServices;
