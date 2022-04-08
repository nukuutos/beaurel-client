import Axios from 'axios';
import { useRef } from 'react';
import useAsyncAction from '../../../../../hooks/use-async-action/use-async-action';

const useHandleSubmit = ({ setData, page, hasMore }) => {
  const [asyncAction, isLoading] = useAsyncAction();

  const cancel = useRef(null);

  const handleSubmit = async (values) => {
    const { city } = values;

    const config = {
      method: 'get',
      url: `/timezone/city`,
      params: { city, page: page.current },
      accessToken: 'nothing',
      cancelToken: new Axios.CancelToken((c) => (cancel.current = c)),
    };

    const data = await asyncAction(config);

    if (data) setData(data.cities);

    hasMore.current = true;
    page.current = 0;
  };

  return [handleSubmit, isLoading, cancel.current];
};

export default useHandleSubmit;
