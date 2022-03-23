import React, { useEffect, useState } from 'react';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';

const useCustomerCard = (id) => {
  const [userData, setUserData] = useState({});
  const [asyncAction, isLoading] = useAsyncAction();

  useEffect(() => {
    const getFavoriteMasters = async () => {
      const config = {
        method: 'get',
        url: `/profile/${id}`,
        accessToken: null,
      };

      const data = await asyncAction(config);

      if (data) setUserData(data);
    };

    getFavoriteMasters();
  }, [asyncAction, id]);

  return [userData, isLoading];
};

export default useCustomerCard;
