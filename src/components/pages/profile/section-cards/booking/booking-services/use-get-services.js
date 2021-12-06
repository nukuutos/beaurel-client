import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { getServicesSuccess } from '../../../../../../redux/service/actions/service';

const useGetServices = () => {
  const [asyncAction, isLoading] = useAsyncAction();
  const router = useRouter();
  const dispatch = useDispatch();

  const { masterId } = useSelector((state) => state.services);

  useEffect(() => {
    const getServices = async () => {
      const config = {
        method: 'get',
        url: `/master/${router.query.id}/service`,
        accessToken: null,
      };

      const { services } = await asyncAction(config);

      if (services) {
        dispatch(getServicesSuccess({ masterId: router.query.id, services }));
      }
    };

    const isServices = masterId === router.query.id;

    if (!isServices) getServices();
  }, [router.query.id, masterId, dispatch, asyncAction]);

  return [isLoading];
};

export default useGetServices;
