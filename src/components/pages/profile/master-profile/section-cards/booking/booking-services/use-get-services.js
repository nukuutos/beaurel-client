import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { getServicesSuccess } from '../../../../../../../redux/service/actions/service';

const useGetServices = () => {
  const [{ id: profileId }, { masterId }] = useSelector((state) => [state.profile, state.services]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  useEffect(() => {
    const getServices = async () => {
      const config = {
        method: 'get',
        url: `/master/${profileId}/service`,
        accessToken: null,
      };

      const { services } = await asyncAction(config);

      if (services) {
        dispatch(getServicesSuccess({ masterId: profileId, services }));
      }
    };

    const isServices = masterId === profileId;

    if (!isServices) getServices();
  }, [profileId, masterId, dispatch, asyncAction]);

  return isLoading;
};

export default useGetServices;
