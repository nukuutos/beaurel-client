import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { getWorksSuccess } from '../../../../../../redux/work/actions';

const useGetWorks = () => {
  const { masterId } = useSelector((state) => state.work);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const queryMasterId = router.query.id;

    const getWorks = async () => {
      const config = {
        method: 'get',
        url: `/master/${queryMasterId}/work`,
        accessToken: null,
      };

      const data = await asyncAction(config);

      if (data) dispatch(getWorksSuccess({ works: data.works, masterId: queryMasterId }));
    };

    const isWorks = masterId === queryMasterId;

    if (!isWorks) getWorks();
  }, [router.query.id, masterId, asyncAction, dispatch]);

  return isLoading;
};

export default useGetWorks;
