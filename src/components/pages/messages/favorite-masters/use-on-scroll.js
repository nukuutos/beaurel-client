import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../hooks/use-async-action/use-async-action';
import { getFavoritesOnScroll } from '../../../../redux/slices/favorites';

const minFavoritesToLoad = 10;

const useOnScroll = () => {
  const [{ id: profileId, accessToken }, favorites] = useSelector((state) => [
    state.auth,
    state.favorites,
  ]);

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const observer = useRef();
  const page = useRef(0);
  const hasMore = useRef(true);
  const isLoadingRef = useRef(isLoading);

  // we have observer ref and last element ref
  // and we need to change last element ref on every new load so we use useCallback as ref

  const isMinimalDataToLoad = favorites.length >= minFavoritesToLoad;

  const refToLoadData = useCallback(
    (node) => {
      // if we have already loading or it first time
      if (isLoadingRef.current || !isMinimalDataToLoad) return;

      // if observer has already existed
      if (observer.current) observer.current.disconnect();

      // entries here are everything that becomes visible (we're observing only one single node)
      observer.current = new IntersectionObserver(async (entries) => {
        const element = entries[0];
        // check api has data to load? hasMore
        if (element.isIntersecting && hasMore.current) {
          page.current++;

          const config = {
            method: 'get',
            url: `/profile/${profileId}/favorite`,
            params: { page: page.current }, // add city
            accessToken,
          };

          const masters = await asyncAction(config);

          if (masters?.length) dispatch(getFavoritesOnScroll(masters));
          else hasMore.current = false;
        }
      });

      if (node) observer.current.observe(node);
    },
    [asyncAction, dispatch, profileId, isMinimalDataToLoad, accessToken]
  );

  return [refToLoadData, isLoading];
};

export default useOnScroll;
