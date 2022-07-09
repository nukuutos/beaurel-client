import Axios from 'axios';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useOnSubmit = ({ setData, hasMore, page }) => {
  const [{ id }, { city }] = useSelector((state) => [state.auth, state.timezone]);
  const [asyncAction, isLoading] = useAsyncAction();
  const cityRef = useRef(city);

  const cancel = useRef(null);

  const handleSubmit = useCallback(
    async (values) => {
      const { specialization, search } = values || { specialization: '', search: '' };

      if (!city) return;

      const config = {
        method: 'get',
        url: `/master`,
        params: { specialization, name: search, city, page: 0 },
        accessToken: 'nothing',
        cancelToken: new Axios.CancelToken((c) => (cancel.current = c)),
      };

      const data = await asyncAction(config);

      if (data) setData(data.masters);

      hasMore.current = true;
      page.current = 0;
    },
    [asyncAction, city, hasMore, page, setData]
  );

  useEffect(() => {
    const authCase = cityRef.current !== city && cityRef.current;
    const publicCase = cityRef.current !== city && !id;

    if (authCase || publicCase) {
      handleSubmit();
    }

    if (cityRef.current !== city) {
      cityRef.current = city;
    }
  }, [city, handleSubmit, id]);

  return [handleSubmit, isLoading, cancel.current];
};

export default useOnSubmit;
