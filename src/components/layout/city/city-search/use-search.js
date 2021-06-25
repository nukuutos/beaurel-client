import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { useRef, useCallback } from 'react';

const useSearch = (form, setData) => {
  const [asyncAction, isLoading, isCancelled] = useAsyncAction();

  const observer = useRef();

  const page = useRef(0);
  const hasMore = useRef(true);

  // we have observer ref and last element ref
  // and we need to change last element ref on every new load so we use useCallback as ref

  const lastMasterCardRef = useCallback((node) => {
    // if we have already loading
    if (isLoading) return;

    // if observer has already existed
    if (observer.current) observer.current.disconnect();

    // entries here are everything that becomes visible (we're observing only one single node)
    observer.current = new IntersectionObserver(async (entries) => {
      const element = entries[0];
      // check api has data to load? hasMore
      if (element.isIntersecting && hasMore.current) {
        const { city } = form.current.values;
        page.current++;

        const config = {
          method: 'get',
          url: `/timezone/city`,
          params: { city, page: page.current },
          accessToken: 'nothing',
        };

        const data = await asyncAction(config);

        if (data && data.cities.length && !isCancelled.current) setData((cities) => [...cities, ...data.cities]);
        else hasMore.current = false;
      }
    });

    if (node) observer.current.observe(node);
  }, []);

  return [lastMasterCardRef, { page, hasMore }, isLoading];
};

export default useSearch;
