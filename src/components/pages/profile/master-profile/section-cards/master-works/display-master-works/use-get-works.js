import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { getWorksSuccess } from '../../../../../../../redux/work/actions';

const useGetWorks = () => {
  const [{ id: masterId }, workState] = useSelector((state) => [state.profile, state.work]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  useEffect(() => {
    const getWorks = async () => {
      const config = {
        method: 'get',
        url: `/master/${masterId}/work`,
        accessToken: null,
      };

      const data = await asyncAction(config);

      if (data) dispatch(getWorksSuccess({ works: data.works, masterId }));
    };

    const isWorks = workState.masterId === masterId;

    if (!isWorks) getWorks();
  }, [masterId, asyncAction, dispatch, workState.masterId]);

  return isLoading;
};

export default useGetWorks;
