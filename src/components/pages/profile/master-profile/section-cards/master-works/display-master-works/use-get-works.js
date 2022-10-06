import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../hooks/use-async-action/use-async-action';
import { getWorks } from '../../../../../../../redux/slices/work';

const useGetWorks = () => {
  const [{ id: masterId }, workState] = useSelector((state) => [state.profile, state.work]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const config = {
        method: 'get',
        url: `/master/${masterId}/work`,
        accessToken: null,
      };

      const data = await asyncAction(config);

      if (data) dispatch(getWorks({ works: data.works, masterId }));
    };

    const isWorks = workState.masterId === masterId;

    if (!isWorks) getData();
  }, [masterId, asyncAction, dispatch, workState.masterId]);

  return isLoading;
};

export default useGetWorks;
