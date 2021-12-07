import Axios from 'axios';
import { useRef } from 'react';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useOnSubmit = ({ setData, hasMore, page }) => {
  const [asyncAction, isLoading] = useAsyncAction();

  const cancel = useRef(null);

  const handleSubmit = async (values) => {
    const { specialization, search } = values;

    const config = {
      method: 'get',
      url: `/master`,
      params: { specialization, name: search, page: 0 }, // add city
      accessToken: 'nothing',
      cancelToken: new Axios.CancelToken((c) => (cancel.current = c)),
    };

    const data = await asyncAction(config);

    if (data) setData(data.masters);

    hasMore.current = true;
    page.current = 0;
  };

  return [handleSubmit, isLoading, cancel.current];
};

export default useOnSubmit;
