import { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';
import { getAppointmentsOnScroll } from '../../../redux/appointments/actions';

const useGetAppointmentsOnScroll = ({ user, category }) => {
  const { id: profileId, accessToken } = useSelector((state) => state.auth);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const observer = useRef();

  const page = useRef(0);
  const hasMore = useRef(true);

  const appointment = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(async (entries) => {
        const element = entries[0];
        if (element.isIntersecting && hasMore.current) {
          page.current++;

          const config = {
            method: 'get',
            url: `/profile/${profileId}/appointment/${user}`,
            params: { page: page.current, category },
            accessToken,
          };

          const data = await asyncAction(config);

          const appointmentsLength = Object.keys(data?.appointments || {}).length;

          if (appointmentsLength) {
            dispatch(getAppointmentsOnScroll({ appointments: data.appointments, category, user }));
          } else {
            hasMore.current = false;
          }
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [dispatch, asyncAction, isLoading, accessToken, profileId, category, user]
  );

  return [appointment, isLoading];
};

export default useGetAppointmentsOnScroll;
