import Axios from 'axios';
import { useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useOnSubmit = ({ setData, hasMore, page }) => {
  const { city } = useSelector((state) => state.timezone);
  const [asyncAction, isLoading] = useAsyncAction();

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

  return [handleSubmit, isLoading, cancel.current];
};

export default useOnSubmit;
