import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../../../../hooks/use-async-action/use-async-action';
import { getAppointmentsSuccess } from '../../../../../../../../../../../redux/appointments/actions';
import { getTimetableSuccess } from '../../../../../../../../../../../redux/timetable/actions';

const useGetDataForUpdate = () => {
  const [{ id: masterId }, timetableState, appointmentsState] = useSelector((state) => [
    state.auth,
    state.timetable,
    state.appointments,
  ]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const isTimetable = timetableState.masterId === masterId;
    const isAppointments = appointmentsState.booking.masterId === masterId;

    const getData = async () => {
      const config = {
        method: 'get',
        url: `/master/${masterId}/timetable/booking`,
        accessToken: null,
      };

      const data = await asyncAction(config);

      const { timetable, appointments } = data;

      if (timetable) {
        dispatch(getTimetableSuccess({ timetable: { masterId, ...timetable } }));
        dispatch(getAppointmentsSuccess({ appointments, masterId }));
      }
    };

    if (!isTimetable && !isAppointments) getData();
  }, [
    router.query.id,
    asyncAction,
    dispatch,
    timetableState.masterId,
    appointmentsState.booking.masterId,
    masterId,
  ]);

  return [isLoading];
};

export default useGetDataForUpdate;
