import { useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../hooks/use-async-action/use-async-action';
import { getReviewsOnScroll } from '../../../../../../redux/profile/actions';

const REVIEWS_LIMIT_TO_LOAD = 10;

const useGetReviews = () => {
  const { id: masterId, reviews } = useSelector((state) => state.profile);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const observer = useRef();

  const page = useRef(0);
  const hasMore = useRef(true);

  const reviewsLength = reviews.length;

  // we have observer ref and last element ref
  // and we need to change last element ref on every new load so we use useCallback as ref
  const reviewRef = useCallback(
    (node) => {
      const needToLoad = reviewsLength >= REVIEWS_LIMIT_TO_LOAD;
      // if we have already loading
      if (isLoading || !needToLoad) return;

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
            url: `/master/${masterId}/review`,
            params: { page: page.current },
          };

          const data = await asyncAction(config);

          if (data?.reviews.length) {
            dispatch(getReviewsOnScroll(data.reviews));
          } else {
            hasMore.current = false;
          }

          if (data?.reviews.length !== REVIEWS_LIMIT_TO_LOAD) {
            hasMore.current = false;
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dispatch, asyncAction, isLoading, masterId, reviewsLength]
  );

  return [reviewRef, isLoading];
};

export default useGetReviews;
