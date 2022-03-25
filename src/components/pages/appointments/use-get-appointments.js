import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../hooks/use-async-action/use-async-action';
import { setAppointments } from '../../../redux/appointments/actions';

const useGetAppointments = (state) => {
  const [{ appointments: appointmentsState }, { id: profileId, accessToken, role }] = useSelector(
    (state) => [state.appointments, state.auth]
  );

  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const { user, category } = state;

  const { appointments, isLoaded } = appointmentsState[user][category];

  const getAppointments = useCallback(async () => {
    const config = {
      method: 'get',
      url: `/profile/${profileId}/appointment/${user}`,
      params: { page: 0, category },
      accessToken,
    };

    const { appointments } = await asyncAction(config);

    if (appointments) {
      dispatch(setAppointments({ appointments, type: category, user }));
    }
  }, [accessToken, asyncAction, profileId, dispatch, user, category]);

  const isSameRole = role === user;
  const isOnConfirmationCategory = category === 'onConfirmation';
  const needToLoadCategory = !(isSameRole && isOnConfirmationCategory); // for SSR data

  useEffect(() => {
    if (!isLoaded && needToLoadCategory) getAppointments();
  }, [isLoaded, getAppointments, needToLoadCategory]);

  return [appointments, isLoading];
};

export default useGetAppointments;
