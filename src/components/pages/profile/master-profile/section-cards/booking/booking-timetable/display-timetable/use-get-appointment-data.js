import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAsyncAction from '../../../../../../../../hooks/use-async-action/use-async-action';
import { getAppointmentsSuccess } from '../../../../../../../../redux/appointments/actions';

const useGetAppointmentData = ({ startDay, today }) => {
  const [{ id: masterId }, { timezone }] = useSelector((state) => [state.profile, state.timetable]);
  const [asyncAction, isLoading] = useAsyncAction();
  const dispatch = useDispatch();

  const dateToLoad = useRef(startDay.add(4, 'week').startOf('day').format());
  const date = startDay.tz(timezone).utc().startOf('day');

  useEffect(() => {
    const getData = async (date) => {
      const config = {
        method: 'get',
        url: `/master/${masterId}/appointment`,
        params: { date },
        accessToken: null,
      };

      const appointments = await asyncAction(config);

      if (appointments) {
        dispatch(getAppointmentsSuccess({ appointments, masterId }));
      }
    };

    const formattedDate = date.format();
    if (dateToLoad.current === formattedDate) {
      getData(dateToLoad.current);
      dateToLoad.current = date.add(4, 'week').startOf('day').format();
      console.log('load');
    }

    console.log(dateToLoad, formattedDate);
  }, [timezone, date, asyncAction, masterId, dispatch]);

  return isLoading;
};

export default useGetAppointmentData;
