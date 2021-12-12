import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';
import { setAppointments } from '../../../redux/appointments/actions';

const useGetAppointments = (state) => {
  const [{ appointments: appointmentsState }, { id: profileId, accessToken }] = useSelector(
    (state) => [state.appointments, state.auth]
  );

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { user, category } = state;

  const { appointments, isLoaded } = appointmentsState[user][category];

  const getAppointments = useCallback(async () => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/appointment/${user}?category=${category}`,
      accessToken,
    };

    const { appointments } = await asyncAction(config);

    if (appointments) {
      dispatch(setAppointments({ appointments, type: category, user }));
    }
  }, [accessToken, asyncAction, profileId, dispatch, user, category]);

  useEffect(() => {
    if (!isLoaded) getAppointments();
  }, [isLoaded, getAppointments]);

  return [appointments, isLoading];
};

export default useGetAppointments;
