import { useEffect } from 'react';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';

const useLoadOnRender = (setData) => {
  const [asyncAction, isLoading] = useAsyncAction();

  useEffect(() => {
    const getCities = async () => {
      const config = {
        method: 'get',
        url: `/timezone/city`,
        params: { city: '', page: 0 }, // add city
        accessToken: 'nothing',
      };

      const data = await asyncAction(config);
      if (data) setData(data.cities);
    };

    getCities();
  }, [asyncAction, setData]);

  return isLoading;
};

export default useLoadOnRender;
